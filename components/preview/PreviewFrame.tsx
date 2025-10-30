'use client';

import { useEffect, useRef, useState } from 'react';

interface PreviewFrameProps {
  code: string;
  bundleError?: string;
}

export function PreviewFrame({ code, bundleError }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState<string>('');
  const [artifactId] = useState(() => {
    // Generate random artifact ID
    return Math.random().toString(36).substring(2, 10);
  });

  useEffect(() => {
    if (!code) return;
    
    console.log('=== Preview Frame Debug ===');
    console.log('Bundled code length:', code.length);
    console.log('First 200 chars:', code.substring(0, 200));
    
    // Create the HTML document with bundled code
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              overflow: hidden;
            }
            #root {
              width: 100%;
              min-height: 100vh;
              overflow: hidden;
            }
            
            /* Artifact header styling */
            .artifact-header {
              background: white;
              color: white;
              padding: 12px 20px;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              position: sticky;
              top: 0;
              z-index: 1000;
            }
        </style>
        </head>
        <body>
        <!-- Artifact Header -->
        <div class="artifact-header">artifact-${artifactId}-hyperkit.app</div>
        
        <div id="root"></div>
        
        <!-- Define globals before loading React -->
        <script>
            window.process = { env: { NODE_ENV: 'production' }, browser: true };
            window.global = window;
        </script>
        
        <!-- Load React 18 UMD with specific version -->
        <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
        
        <script>
            // Verify React loaded properly
            if (!window.React || !window.ReactDOM) {
              console.error('❌ React failed to load!');
              console.error('React:', window.React);
              console.error('ReactDOM:', window.ReactDOM);
              document.getElementById('root').innerHTML = '<div style="padding:20px;color:red;"><h3>Error: React libraries failed to load</h3><p>Please refresh the page</p></div>';
            } else {
              console.log('✅ React loaded:', window.React.version);
              console.log('✅ ReactDOM loaded');
              console.log('✅ React.createElement available:', typeof window.React.createElement);
              console.log('✅ ReactDOM.createRoot available:', typeof window.ReactDOM.createRoot);
            }
            
            // Capture console methods
            const originalConsole = {
              log: console.log,
              error: console.error,
              warn: console.warn
            };

            ['log', 'error', 'warn'].forEach(method => {
              console[method] = (...args) => {
                originalConsole[method](...args);
                window.parent.postMessage({
                  type: 'console',
                  method: method,
                  args: args.map(arg => {
                    try {
                      return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                    } catch (e) {
                      return String(arg);
                    }
                  })
                }, '*');
              };
            });

            // Capture unhandled errors
            window.addEventListener('error', (event) => {
              console.error('Runtime Error:', event.message, 'at', event.filename, event.lineno + ':' + event.colno);
              event.preventDefault();
            });

            window.addEventListener('unhandledrejection', (event) => {
              console.error('Unhandled Promise Rejection:', event.reason);
              event.preventDefault();
            });
        </script>
        
        <!-- Execute bundled code -->
        <script>
            (function() {
              try {
                console.log('=== Executing bundled code ===');
                ${code}
                console.log('✅ Code executed successfully');
                
                // Verify root was rendered
                setTimeout(() => {
                  const rootEl = document.getElementById('root');
                  if (rootEl && rootEl.children.length === 0) {
                    console.warn('⚠️ Root element is empty - component may not have rendered');
                    rootEl.innerHTML = '<div style="padding:20px;color:orange;">Warning: Component did not render. Check console for errors.</div>';
                  }
                }, 100);
              } catch (error) {
                console.error('❌ Execution Error:', error.message);
                console.error('Stack:', error.stack);
                document.getElementById('root').innerHTML = '<div style="padding:20px;"><h2 style="color:red;">Execution Error</h2><pre style="background:#f5f5f5;padding:15px;border-radius:8px;overflow:auto;">' + error.message + '\\n\\n' + error.stack + '</pre></div>';
              }
            })();
        </script>
        </body>
        </html>
        `.trim();

    setHtml(htmlContent);
    setError(null);
  }, [code, artifactId]);

  return (
    <div className="preview-frame-wrapper">
      {(error || bundleError) && (
        <div className="preview-error">
          <strong>Preview Error:</strong> {error || bundleError}
        </div>
      )}
      <iframe
        key={html}
        ref={iframeRef}
        className="preview-iframe"
        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
        srcDoc={html}
        title="Code Preview"
      />
    </div>
  );
}
