/**
 * Skeleton templates for AI-generated code
 * These provide the boilerplate structure that wraps AI-generated components
 */

export interface GeneratedFile {
  name: string;
  content: string;
  language: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'css' | 'html';
}

export interface GeneratedProject {
  name: string;
  description: string;
  files: GeneratedFile[];
  entryFile: string; // Main file to execute
}

interface SkeletonConfig {
  componentName: string;
  prompt: string;
  useWeb3?: boolean;
  includeStyles?: boolean;
}

/**
 * Generate a basic React component skeleton
 */
export function generateBasicSkeleton(config: SkeletonConfig): string {
  const { componentName = 'App', prompt } = config;
  
  return `
import React from 'react';

// Component generated from prompt: "${prompt}"
export default function ${componentName}() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Generated Component: ${componentName}</h1>
      <p>Prompt: ${prompt}</p>
      <p>This is a placeholder. AI will replace this with actual content.</p>
    </div>
  );
}

// Render the component
const root = document.getElementById('root');
if (root) {
  const rootInstance = window.ReactDOM.createRoot(root);
  rootInstance.render(window.React.createElement(${componentName}));
}
`.trim();
}

/**
 * Generate a Web3-enabled component skeleton with HyperkitProvider
 */
export function generateWeb3Skeleton(config: SkeletonConfig): string {
  const { componentName = 'Web3App', prompt } = config;
  
  return `
import React from 'react';

// Web3 component generated from prompt: "${prompt}"
function ${componentName}() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1 style={{ margin: 0 }}>Web3 DApp</h1>
      </header>
      
      <main>
        <h2>Generated from prompt:</h2>
        <p style={{ 
          padding: '15px', 
          background: '#f3f4f6', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          ${prompt}
        </p>
        
        <div style={{
          padding: '20px',
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <p>AI-generated content will appear here</p>
        </div>
      </main>
    </div>
  );
}

// Render the component
const root = document.getElementById('root');
if (root) {
  const rootInstance = window.ReactDOM.createRoot(root);
  rootInstance.render(window.React.createElement(${componentName}));
}
`.trim();
}

/**
 * Generate a styled component skeleton with custom CSS
 */
export function generateStyledSkeleton(config: SkeletonConfig): string {
  const { componentName = 'StyledApp', prompt } = config;
  
  return `
import React from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'white',
    padding: '40px 20px',
    fontFamily: 'system-ui, sans-serif'
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: 'black',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  prompt: {
    padding: '15px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '30px',
    fontSize: '14px',
    color: '#6b7280'
  },
  content: {
    padding: '30px',
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    textAlign: 'center',
    color: '#9ca3af'
  }
};

// Styled component generated from prompt: "${prompt}"
function ${componentName}() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          ${componentName}
        </h1>
        <div style={styles.prompt}>
          <strong>Prompt:</strong> ${prompt}
        </div>
        <div style={styles.content}>
          <p>✨ AI-generated styled content will appear here</p>
        </div>
      </div>
    </div>
  );
}

// Render the component
const root = document.getElementById('root');
if (root) {
  const rootInstance = window.ReactDOM.createRoot(root);
  rootInstance.render(window.React.createElement(${componentName}));
}
`.trim();
}

/**
 * Main skeleton generator - chooses appropriate template based on prompt
 */
export function generateSkeleton(prompt: string): string {
  // Analyze prompt to determine which skeleton to use
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for Web3 keywords
  const isWeb3 = /wallet|web3|blockchain|metamask|connect|crypto|token|swap|bridge|stake|defi/i.test(prompt);
  
  // Check for styling keywords
  const needsStyling = /styled|beautiful|modern|gradient|animated|colorful|design/i.test(prompt);
  
  // Generate component name from prompt (simple extraction)
  const componentName = extractComponentName(prompt);
  
  const config: SkeletonConfig = {
    componentName,
    prompt,
    useWeb3: isWeb3,
    includeStyles: needsStyling
  };
  
  // Choose appropriate skeleton
  if (isWeb3) {
    return generateWeb3Skeleton(config);
  } else if (needsStyling) {
    return generateStyledSkeleton(config);
  } else {
    return generateBasicSkeleton(config);
  }
}

/**
 * Extract a component name from the prompt
 */
function extractComponentName(prompt: string): string {
  // Look for common patterns like "create a X" or "build a Y"
  const patterns = [
    /create (?:a|an) ([\w\s]+?)(?:\s+component|\s+page|\s+app)?(?:\.|$)/i,
    /build (?:a|an) ([\w\s]+?)(?:\s+component|\s+page|\s+app)?(?:\.|$)/i,
    /make (?:a|an) ([\w\s]+?)(?:\s+component|\s+page|\s+app)?(?:\.|$)/i,
    /([\w\s]+?)(?:\s+component|\s+page|\s+app)/i
  ];
  
  for (const pattern of patterns) {
    const match = prompt.match(pattern);
    if (match && match[1]) {
      // Convert to PascalCase
      return match[1]
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('') + 'App';
    }
  }
  
  // Default name if no pattern matches
  return 'GeneratedApp';
}

/**
 * Process AI-generated code - Clean and validate
 * This function takes raw AI output and prepares it for bundling
 */
export function processAIGeneratedCode(rawCode: string, componentName?: string): string {
  console.log('Processing AI generated code...');
  
  // Step 1: Remove markdown code blocks
  let cleanCode = rawCode;
  
  // Remove ```jsx, ```tsx, ```javascript, ```typescript, ```js, ```ts, ```html
  cleanCode = cleanCode.replace(/```(?:jsx|tsx|javascript|typescript|js|ts|html)\n?/g, '');
  cleanCode = cleanCode.replace(/```\n?/g, '');
  
  // Step 2: Trim whitespace
  cleanCode = cleanCode.trim();
  
  // Step 2.5: Auto-fix common syntax errors
  console.log('Auto-fixing common syntax errors...');
  
  // Fix: "functionName()" -> "function Name()"
  cleanCode = cleanCode.replace(/\bfunction([A-Z]\w*)\(/g, 'function $1(');
  
  // Fix: missing opening brace after function declaration
  // "function Name() return" -> "function Name() { return"
  cleanCode = cleanCode.replace(/function\s+(\w+)\s*\(\s*\)\s+return/g, 'function $1() {\n  return');
  
  // Fix: missing opening brace after arrow function
  // "const Name = () return" -> "const Name = () => { return"
  cleanCode = cleanCode.replace(/=\s*\(\s*\)\s+return/g, '= () => {\n  return');
  
  // Fix: missing spaces after keywords
  cleanCode = cleanCode.replace(/\bif\(/g, 'if (');
  cleanCode = cleanCode.replace(/\bfor\(/g, 'for (');
  cleanCode = cleanCode.replace(/\bwhile\(/g, 'while (');
  
  // Fix: unclosed style objects - comprehensive patterns
  // Pattern 1: style={{ prop: value > (missing closing braces before >)
  cleanCode = cleanCode.replace(/style=\{\{([^}]+?)>/g, 'style={{ $1 }}>');
  
  // Pattern 2: style={{ prop: value Text (text right after without closing)
  cleanCode = cleanCode.replace(/style=\{\{([^}]+?)\s+([A-Z][a-zA-Z\s]+)/g, 'style={{ $1 }}>$2');
  
  // Pattern 3: style={{ prop: 'value'Text (no space or closing)
  cleanCode = cleanCode.replace(/style=\{\{([^}]+?)'([A-Z])/g, 'style={{ $1\' }}>$2');
  
  // Pattern 4: Fix any style={{ that ends a line without }}
  const lines = cleanCode.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line has style={{ but no }}
    if (line.includes('style={{') && !line.includes('}}')) {
      const openCount = (line.match(/\{/g) || []).length;
      const closeCount = (line.match(/\}/g) || []).length;
      if (openCount > closeCount + 2) { // +2 for the {{ in style={{
        // Add missing closing braces before the >
        lines[i] = line.replace(/>/, ' }}>');
      }
    }
  }
  cleanCode = lines.join('\n');
  
  // Fix: numeric style values without quotes (fontSize: 20 -> fontSize: '20px')
  cleanCode = cleanCode.replace(/(\w+):\s*(\d+)(?!\d|px|em|rem|%)/g, (match, prop, value) => {
    // Common CSS properties that need 'px' suffix
    const needsPx = ['fontSize', 'width', 'height', 'padding', 'margin', 'top', 'left', 'right', 'bottom', 'borderRadius', 'gap'];
    if (needsPx.some(p => prop.includes(p))) {
      return `${prop}: '${value}px'`;
    }
    return match;
  });
  
  console.log('✓ Auto-fix complete');
  
  // Step 3: Detect if this is vanilla HTML/JS (not React)
  const isVanillaHTML = cleanCode.includes('<!DOCTYPE html>') || 
                        cleanCode.includes('<html>') ||
                        (cleanCode.includes('<body>') && !cleanCode.includes('React'));
  
  if (isVanillaHTML) {
    console.log('❌ Detected vanilla HTML - AI did not follow instructions!');
    console.log('Refusing to convert. Generating simple fallback component.');
    
    // Instead of trying to convert, return a simple error component
    // This will force the AI to learn to generate proper React code
    componentName = componentName || 'App';
    
    cleanCode = `
import React from 'react';

function ${componentName}() {
  return (
    <div style={{
      padding: '40px',
      maxWidth: '600px',
      margin: '50px auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      color: 'white',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>⚠️ Generation Error</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
        The AI generated vanilla HTML instead of React code.
      </p>
      <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
        Please try again or rephrase your request. The system expects React functional components.
      </p>
    </div>
  );
}

// Render the component
const root = document.getElementById('root');
if (root) {
  const rootInstance = window.ReactDOM.createRoot(root);
  rootInstance.render(window.React.createElement(${componentName}));
}
    `.trim();
    
    console.log('Generated fallback error component');
  }
  
  // Step 4: Check if React import exists, add if missing
  if (!cleanCode.includes('import React') && !cleanCode.includes("from 'react'")) {
    cleanCode = `import React from 'react';\n\n${cleanCode}`;
  }
  
  // Step 5: Extract component name if not provided
  if (!componentName) {
    const functionMatch = cleanCode.match(/function\s+(\w+)\s*\(/);
    const constMatch = cleanCode.match(/const\s+(\w+)\s*=/);
    componentName = functionMatch?.[1] || constMatch?.[1] || 'App';
  }
  
  // Step 6: Check if rendering logic exists
  const hasRenderLogic = 
    cleanCode.includes('ReactDOM.createRoot') || 
    cleanCode.includes('window.ReactDOM') ||
    cleanCode.includes('document.getElementById');
  
  // Step 7: Add rendering logic if missing
  if (!hasRenderLogic) {
    const renderCode = `

// Render the component
const root = document.getElementById('root');
if (root) {
  const rootInstance = window.ReactDOM.createRoot(root);
  rootInstance.render(window.React.createElement(${componentName}));
}`;
    cleanCode += renderCode;
  }
  
  // Step 8: Ensure window.React and window.ReactDOM are used
  cleanCode = cleanCode.replace(/\bReactDOM\.createRoot/g, 'window.ReactDOM.createRoot');
  cleanCode = cleanCode.replace(/\bReact\.createElement/g, 'window.React.createElement');
  cleanCode = cleanCode.replace(/\bReact\.useState/g, 'window.React.useState');
  cleanCode = cleanCode.replace(/\bReact\.useEffect/g, 'window.React.useEffect');
  cleanCode = cleanCode.replace(/\bReact\.useRef/g, 'window.React.useRef');
  
  // Step 9: Validate JSX syntax before bundling
  console.log('=== Validating JavaScript & JSX syntax ===');
  
  // Check for common syntax errors
  const syntaxErrors = [];
  
  // Check for malformed function declarations (e.g., "functionName()" instead of "function Name()")
  const malformedFunctions = cleanCode.match(/\bfunction[A-Z]\w*\(/g);
  if (malformedFunctions) {
    syntaxErrors.push('Malformed function declaration (missing space after "function")');
    console.error('❌ Malformed functions found:', malformedFunctions);
  }
  
  // Check for unclosed style objects - look for style={{ without matching }}
  // More sophisticated check: find style={{ and verify it has proper closing
  const stylePattern = /style=\{\{([^}]|}\s*[^}>])*$/gm;
  const unclosedStyles = cleanCode.match(stylePattern);
  if (unclosedStyles && unclosedStyles.length > 0) {
    // Additional verification - check if it's really unclosed or just multiline
    let hasUnclosedStyle = false;
    for (const match of unclosedStyles) {
      // Count braces in the match
      const openBraces = (match.match(/\{/g) || []).length;
      const closeBraces = (match.match(/\}/g) || []).length;
      if (openBraces > closeBraces) {
        hasUnclosedStyle = true;
        console.error('❌ Unclosed style object:', match.substring(0, 100));
        break;
      }
    }
    if (hasUnclosedStyle) {
      syntaxErrors.push('Unclosed style object detected');
    }
  }
  
  // Note: We skip brace/parentheses counting as it's unreliable
  // (counts braces in strings, comments, etc.)
  // The bundler will catch actual syntax errors
  
  // Check for basic structure
  const hasFunction = /function\s+\w+/.test(cleanCode) || /const\s+\w+\s*=/.test(cleanCode);
  const hasReturn = /return\s*[\(\<]/.test(cleanCode);
  const hasRenderCode = /window\.ReactDOM\.createRoot/.test(cleanCode);
  
  if (!hasFunction) {
    syntaxErrors.push('No function declaration found');
  }
  if (!hasReturn) {
    syntaxErrors.push('No return statement found');
  }
  if (!hasRenderCode) {
    syntaxErrors.push('No render code found');
  }
  
  // If there are CRITICAL syntax errors, return a safe error component
  // (Don't fail on minor issues - let the bundler catch them)
  if (syntaxErrors.length > 0) {
    console.warn('⚠️ Potential issues detected:', syntaxErrors);
    console.log('Code will be sent to bundler for final validation');
    console.log('Code sample:', cleanCode.substring(0, 300));
    
    // Only return error component for CRITICAL issues
    const criticalErrors = syntaxErrors.filter(err => 
      err.includes('No function') || 
      err.includes('No return') || 
      err.includes('No render')
    );
    
    if (criticalErrors.length > 0) {
      console.error('❌ Critical validation errors:', criticalErrors);
      
      const componentName = 'ErrorComponent';
      return `
import React from 'react';

function ${componentName}() {
  return (
    <div style={{
      padding: '40px',
      maxWidth: '700px',
      margin: '50px auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      borderRadius: '12px',
      color: 'white',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>❌ Syntax Error Detected</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '15px', fontSize: '16px' }}>
        The AI generated code with syntax errors:
      </p>
      <ul style={{ marginLeft: '20px', marginBottom: '20px', lineHeight: '1.8' }}>
        ${criticalErrors.map(err => `<li>${err}</li>`).join('\n        ')}
      </ul>
      <p style={{ lineHeight: '1.6', opacity: 0.95, fontSize: '14px' }}>
        Please try regenerating your request. Make sure to describe your requirements clearly.
      </p>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  const rootInstance = window.ReactDOM.createRoot(root);
  rootInstance.render(window.React.createElement(${componentName}));
}
      `.trim();
    }
  }
  
  console.log('✅ Validation passed - sending to bundler');
  return cleanCode;
}

/**
 * Validate that code is safe to execute
 */
export function validateCode(code: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /eval\s*\(/g,
    /Function\s*\(/g,
    /document\.write/g,
    /innerHTML\s*=/g,
    /__proto__/g,
    /constructor\s*\[/g,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      errors.push(`Dangerous pattern detected: ${pattern.source}`);
    }
  }
  
  // Check for required elements
  if (!code.includes('React')) {
    errors.push('Missing React import or usage');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Extract metadata from generated code
 */
export function extractCodeMetadata(code: string): {
  componentName: string;
  hasHooks: boolean;
  hasStyles: boolean;
  lineCount: number;
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
} {
  const componentMatch = code.match(/function\s+(\w+)\s*\(/) || code.match(/const\s+(\w+)\s*=/);
  const componentName = componentMatch?.[1] || 'Unknown';
  
  const hasHooks = /use[A-Z]\w+/.test(code);
  const hasStyles = /style\s*=/.test(code) || /styled/.test(code);
  const lineCount = code.split('\n').length;
  
  let estimatedComplexity: 'simple' | 'moderate' | 'complex' = 'simple';
  if (lineCount > 100 || (hasHooks && code.match(/use[A-Z]\w+/g)?.length || 0 > 3)) {
    estimatedComplexity = 'complex';
  } else if (lineCount > 50 || hasHooks) {
    estimatedComplexity = 'moderate';
  }
  
  return {
    componentName,
    hasHooks,
    hasStyles,
    lineCount,
    estimatedComplexity,
  };
}

/**
 * Example usage and presets
 */
export const skeletonPresets = {
  basic: {
    name: 'Basic Component',
    description: 'Simple React component with minimal styling',
    example: 'Create a todo list component'
  },
  web3: {
    name: 'Web3 DApp',
    description: 'Web3-enabled component with wallet connection',
    example: 'Build a token swap interface with MetaMask'
  },
  styled: {
    name: 'Styled Component',
    description: 'Beautiful component with gradients and modern design',
    example: 'Create a beautiful landing page with gradient backgrounds'
  }
};

// Legacy support: Keep DEFAULT_PROJECT for backward compatibility
export const DEFAULT_PROJECT: GeneratedProject = {
  name: 'Example App',
  description: 'A simple example generated from a prompt',
  entryFile: 'App.jsx',
  files: [
    {
      name: 'App.jsx',
      language: 'jsx',
      content: generateSkeleton('Create a simple hello world application')
    }
  ]
};