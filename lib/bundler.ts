import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

// File system for unpkg plugin
const fileCache = localforage.createInstance({
  name: 'fileCache'
});

// Initialize esbuild-wasm (singleton pattern to prevent multiple initializations)
export const initializeBundler = async () => {
  // If already initialized, return immediately
  if (isInitialized) {
    return;
  }
  
  // If initialization is in progress, wait for it
  if (initializationPromise) {
    return initializationPromise;
  }
  
  // Start new initialization
  initializationPromise = (async () => {
    try {
      await esbuild.initialize({
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.25.11/esbuild.wasm',
        worker: false // Set to false to avoid Worker issues
      });
      isInitialized = true;
      console.log('✅ esbuild-wasm initialized');
    } catch (err) {
      // If it's already initialized error, mark as initialized anyway
      if (err instanceof Error && err.message.includes('Cannot call "initialize" more than once')) {
        isInitialized = true;
        console.log('✅ esbuild-wasm already initialized');
        return;
      }
      console.error('Failed to initialize esbuild:', err);
      initializationPromise = null; // Reset on error so it can be retried
      throw err;
    }
  })();
  
  return initializationPromise;
};

// Plugin to resolve npm packages from unpkg
const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file
      build.onResolve({ filter: /^index\.js$/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle Node.js built-ins that should use browser globals
      build.onResolve({ filter: /^(crypto|stream|buffer|events|util|process|zlib|http|https|fs|path|os)$/ }, (args: any) => {
        return { path: args.path, namespace: 'node-globals' };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};

// Plugin to handle Node.js built-ins with browser alternatives
const nodeGlobalsPlugin = () => {
  return {
    name: 'node-globals-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/, namespace: 'node-globals' }, (args) => {
        // Provide empty or minimal implementations for Node.js built-ins
        const globalMappings: Record<string, string> = {
          crypto: 'export default (window.crypto || {})',
          stream: 'export default {}',
          buffer: 'export const Buffer = window.Buffer || {}',
          events: 'export class EventEmitter {}',
          util: 'export default {}',
          process: 'export default { env: {}, browser: true }',
          zlib: 'export default {}',
          http: 'export default {}',
          https: 'export default {}',
          fs: 'export default {}',
          path: 'export default { join: (...args) => args.join("/"), resolve: (...args) => args.join("/") }',
          os: 'export default { platform: () => "browser" }'
        };

        return {
          contents: globalMappings[args.path] || 'export default {}',
          loader: 'js',
        };
      });
    },
  };
};

// Plugin to fetch packages from unpkg
const unpkgFetchPlugin = () => {
  return {
    name: 'unpkg-fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file
      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: 'jsx',
          contents: '',
        };
      });

      // Check cache first
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        
        if (cachedResult) {
          return cachedResult;
        }
        
        return null;
      });

      // Handle CSS files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const response = await fetch(args.path);
        const data = await response.text();

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', response.url).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });

      // Handle JS/JSX files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const response = await fetch(args.path);
        const data = await response.text();

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', response.url).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};

// Plugin to replace React imports with global references
const reactGlobalPlugin = () => {
  return {
    name: 'react-global-plugin',
    setup(build: esbuild.PluginBuild) {
      // Intercept react and react-dom imports
      build.onResolve({ filter: /^react$/ }, (args) => {
        return { path: 'react', namespace: 'react-global' };
      });
      
      build.onResolve({ filter: /^react-dom$/ }, (args) => {
        return { path: 'react-dom', namespace: 'react-global' };
      });

      // Intercept ethers imports
      build.onResolve({ filter: /^ethers$/ }, (args) => {
        return { path: 'ethers', namespace: 'react-global' };
      });

      // Intercept hyperionkit imports
      build.onResolve({ filter: /^hyperionkit$/ }, (args) => {
        return { path: 'hyperionkit', namespace: 'react-global' };
      });
      
      // Return global references for React
      build.onLoad({ filter: /.*/, namespace: 'react-global' }, (args) => {
        if (args.path === 'react') {
          return {
            contents: 'module.exports = window.React',
            loader: 'js',
          };
        }
        if (args.path === 'react-dom') {
          return {
            contents: 'module.exports = window.ReactDOM',
            loader: 'js',
          };
        }
        if (args.path === 'ethers') {
          return {
            contents: 'module.exports = window.ethers',
            loader: 'js',
          };
        }
        if (args.path === 'hyperionkit') {
          return {
            contents: `
              module.exports = {
                HyperkitProvider: window.HyperkitProvider,
                ConnectWallet: window.ConnectWallet
              }
            `,
            loader: 'js',
          };
        }
        
        return undefined;
      });
    },
  };
};

export interface BundleResult {
  code: string;
  error?: string;
}

// Bundle code with esbuild
export const bundle = async (rawCode: string): Promise<BundleResult> => {
  if (!isInitialized) {
    await initializeBundler();
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), unpkgFetchPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    return {
      code: result.outputFiles[0].text,
    };
  } catch (err: any) {
    return {
      code: '',
      error: err.message,
    };
  }
};

// Bundle with custom input code
export const bundleCode = async (code: string): Promise<BundleResult> => {
  if (!isInitialized) {
    await initializeBundler();
  }

  try {
    // Override the root file with custom code
    const customFetchPlugin = {
      name: 'custom-fetch-plugin',
      setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /^index\.js$/ }, () => {
          return {
            loader: 'jsx',
            contents: code,
          };
        });
      },
    };

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [customFetchPlugin, reactGlobalPlugin(), nodeGlobalsPlugin(), unpkgPathPlugin(), unpkgFetchPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      format: 'iife', // Immediately Invoked Function Expression
      globalName: 'AppBundle', // Not really used but required for IIFE
      external: [], // Don't mark anything as external, we want to bundle everything
    });

    return {
      code: result.outputFiles[0].text,
      error: undefined,
    };
  } catch (err: any) {
    return {
      code: '',
      error: err.message,
    };
  }
};
