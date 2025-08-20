import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, AI_MODELS } from '@/constants';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = 'gpt-5' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Validate model
    const selectedModel = AI_MODELS.find(m => m.id === model);
    if (!selectedModel || !selectedModel.available) {
      return NextResponse.json({ error: 'Invalid or unavailable model' }, { status: 400 });
    }

    // Check if it's a project-related prompt
    if (!isProjectPrompt(prompt)) {
      return NextResponse.json({ 
        error: 'Sorry, I can only help with project generation. Please describe a web application you\'d like me to create.' 
      }, { status: 400 });
    }

    // Generate response using GitHub models
    let response: string;
    if (selectedModel.provider === 'github') {
      response = await generateWithGitHub(prompt, model);
    } else {
      // Fallback for any unknown providers
      response = generateFallbackHTML(prompt);
    }
    
    return NextResponse.json({ 
      content: response,
      model: model,
      provider: selectedModel.provider
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate project. Please try again.' },
      { status: 500 }
    );
  }
}

function isProjectPrompt(prompt: string): boolean {
  const projectKeywords = [
    'create', 'build', 'make', 'generate', 'develop',
    'app', 'application', 'website', 'project', 'game',
    'dashboard', 'interface', 'platform', 'tool',
    'dapp', 'defi', 'nft', 'wallet', 'crypto', 'blockchain'
  ];

  const lowerPrompt = prompt.toLowerCase();
  return projectKeywords.some(keyword => lowerPrompt.includes(keyword));
}

async function generateWithGitHub(prompt: string, model: string): Promise<string> {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      throw new Error('GitHub token not configured');
    }

    // Map our model IDs to GitHub model names
    const modelMap: Record<string, string> = {
      'gpt-5': 'gpt-5',
      'gpt-4o': 'gpt-4o',
      'gpt-4-turbo': 'gpt-4-turbo',
      'gpt-4': 'gpt-4'
    };

    const githubModel = modelMap[model] || 'gpt-4';
    
    const enhancedPrompt = buildEnhancedPrompt(prompt);
    
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${githubToken}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: enhancedPrompt }
        ],
        model: githubModel,
        max_completion_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      
      // Handle rate limiting with retry after delay
      if (response.status === 429) {
        const errorData = JSON.parse(errorText);
        const waitTime = extractWaitTime(errorData.error?.message) || 10;
        console.log(`Rate limited. Waiting ${waitTime} seconds before fallback...`);
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        // Return fallback instead of retrying to avoid blocking
        return generateFallbackHTML(prompt);
      }
      
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || generateFallbackHTML(prompt);
  } catch (error) {
    console.error('GitHub generation error:', error);
    // Fallback to HTML template if GitHub fails
    return generateFallbackHTML(prompt);
  }
}

function extractWaitTime(message: string): number | null {
  if (!message) return null;
  
  // Extract wait time from messages like "Please wait 6 seconds before retrying"
  const match = message.match(/wait (\d+) seconds?/i);
  return match ? parseInt(match[1], 10) : null;
}

function buildEnhancedPrompt(userPrompt: string): string {
  return `
Generate a complete web application based on this request: "${userPrompt}"

CRITICAL REQUIREMENTS:
1. Create a single HTML file with embedded CSS and JavaScript
2. Create mock HyperionKit components that look and feel like the real ones
3. Initialize components with placeholder functionality until real HyperionKit is integrated
4. Add relevant HyperionKit components based on project needs:
   - ConnectWallet (top-right corner)
   - Swap for DeFi/trading features
   - Bridge for cross-chain features  
   - Staking for yield farming
   - Faucet for testnet functionality
6. Use modern, responsive design with professional appearance
7. Make it fully functional and ready to run with React support if needed
8. Use attractive styling with gradients, shadows, and modern UI elements

REQUIRED STRUCTURE:
<body>
    <div id="root"></div>
    
    <script>
        // Mock HyperionKit components that work without external dependencies
        window.HyperionKit = {
            HyperkitProvider: function({ children }) {
                return React.createElement('div', { className: 'hyperkit-provider' }, children);
            },
            ConnectWallet: function(props) {
                return React.createElement('button', {
                    style: {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease'
                    },
                    onClick: () => alert('🔗 Connect Wallet clicked! (HyperionKit placeholder)')
                }, '🔗 Connect Wallet');
            },
            Swap: function(props) {
                return React.createElement('div', {
                    style: { padding: '20px', border: '2px dashed #10b981', borderRadius: '10px', textAlign: 'center' }
                }, 'Token Swap Component (HyperionKit placeholder)');
            },
            Bridge: function(props) {
                return React.createElement('div', {
                    style: { padding: '20px', border: '2px dashed #3b82f6', borderRadius: '10px', textAlign: 'center' }
                }, 'Bridge Component (HyperionKit placeholder)');
            },
            Staking: function(props) {
                return React.createElement('div', {
                    style: { padding: '20px', border: '2px dashed #8b5cf6', borderRadius: '10px', textAlign: 'center' }
                }, 'Staking Component (HyperionKit placeholder)');
            },
            Faucet: function(props) {
                return React.createElement('div', {
                    style: { padding: '20px', border: '2px dashed #f59e0b', borderRadius: '10px', textAlign: 'center' }
                }, 'Faucet Component (HyperionKit placeholder)');
            }
        };
        
        // Trigger app initialization
        window.addEventListener('load', () => {
            window.dispatchEvent(new CustomEvent('app-ready'));
        });
    </script>
    
    <script type="text/babel">
        function App() {
            const { HyperkitProvider, ConnectWallet, Swap, Bridge, Staking, Faucet } = window.HyperionKit;
            
            return React.createElement(HyperkitProvider, null,
                React.createElement('div', null,
                    React.createElement('div', { 
                        style: { position: 'fixed', top: '20px', right: '20px', zIndex: 1000 } 
                    }, React.createElement(ConnectWallet)),
                    
                    // Your app content here
                )
            );
        }
        
        window.addEventListener('app-ready', () => {
            ReactDOM.render(React.createElement(App), document.getElementById('root'));
        });
    </script>
</body>

Please respond with ONLY the HTML code, no explanations or markdown formatting.
`;
}

function generateFallbackHTML(prompt: string): string {
  const projectName = prompt.split(' ').slice(0, 3).join(' ') || 'HyperionKit Project';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }
        
        .wallet-section {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 3rem;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2rem;
            color: #666;
        }
        
        .interactive-section {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .counter {
            text-align: center;
            margin: 20px 0;
        }
        
        .counter button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .counter button:hover {
            background: #764ba2;
            transform: translateY(-2px);
        }
        
        .live-time {
            background: #4f46e5;
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
            font-size: 1.2rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .feature-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #333;
        }
        
        .feature-card p {
            color: #666;
            line-height: 1.6;
        }
        
        .dapp-components {
            margin-top: 50px;
            text-align: center;
        }
        
        .components-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .component-container {
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid #667eea;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .component-container:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: scale(1.02);
        }
        
        .cta-section {
            text-align: center;
            margin-top: 60px;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            color: white;
        }
        
        .cta-button {
            background: white;
            color: #667eea;
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .react-demo {
            background: #1f2937;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <!-- Mock HyperionKit components - no external dependencies -->
    <script>
        // Create mock HyperionKit components that work immediately
        window.HyperionKit = {
            HyperkitProvider: function({ children }) {
                return React.createElement('div', { 
                    className: 'hyperkit-provider',
                    style: { minHeight: '100vh' }
                }, children);
            },
            ConnectWallet: function(props) {
                const [connected, setConnected] = React.useState(false);
                
                return React.createElement('button', {
                    style: {
                        background: connected ? 
                            'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1)',
                    },
                    onClick: () => {
                        setConnected(!connected);
                        alert(connected ? '❌ Wallet Disconnected!' : '✅ Wallet Connected! (HyperionKit Mock)');
                    },
                    onMouseOver: (e) => {
                        e.target.style.transform = 'scale(1.05)';
                    },
                    onMouseOut: (e) => {
                        e.target.style.transform = 'scale(1)';
                    }
                }, connected ? '✅ Connected' : '🔗 Connect Wallet');
            },
            Swap: function(props) {
                const [fromToken, setFromToken] = React.useState('ETH');
                const [toToken, setToToken] = React.useState('USDC');
                const [amount, setAmount] = React.useState('');
                
                return React.createElement('div', {
                    style: { 
                        padding: '25px', 
                        border: '2px solid #10b981', 
                        borderRadius: '15px', 
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                        minHeight: '200px'
                    }
                }, 
                    React.createElement('h4', { style: { marginBottom: '15px', color: '#10b981' } }, '💱 Token Swap'),
                    React.createElement('div', { style: { marginBottom: '10px' } },
                        React.createElement('input', {
                            type: 'number',
                            placeholder: 'Enter amount',
                            value: amount,
                            onChange: (e) => setAmount(e.target.value),
                            style: { padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }
                        }),
                        React.createElement('select', {
                            value: fromToken,
                            onChange: (e) => setFromToken(e.target.value),
                            style: { padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }
                        },
                            React.createElement('option', { value: 'ETH' }, 'ETH'),
                            React.createElement('option', { value: 'BTC' }, 'BTC'),
                            React.createElement('option', { value: 'USDC' }, 'USDC')
                        )
                    ),
                    React.createElement('div', { style: { margin: '15px 0', textAlign: 'center' } }, '⬇️'),
                    React.createElement('div', { style: { marginBottom: '15px' } },
                        React.createElement('select', {
                            value: toToken,
                            onChange: (e) => setToToken(e.target.value),
                            style: { padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }
                        },
                            React.createElement('option', { value: 'USDC' }, 'USDC'),
                            React.createElement('option', { value: 'ETH' }, 'ETH'),
                            React.createElement('option', { value: 'BTC' }, 'BTC')
                        )
                    ),
                    React.createElement('button', {
                        style: { 
                            background: '#10b981', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 20px', 
                            borderRadius: '8px', 
                            cursor: 'pointer' 
                        },
                        onClick: () => alert(\`🔄 Swapping \${amount} \${fromToken} to \${toToken} (Mock)\`)
                    }, 'Swap Tokens')
                );
            },
            Bridge: function(props) {
                return React.createElement('div', {
                    style: { 
                        padding: '25px', 
                        border: '2px solid #3b82f6', 
                        borderRadius: '15px', 
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)',
                        textAlign: 'center',
                        minHeight: '200px'
                    }
                },
                    React.createElement('h4', { style: { marginBottom: '15px', color: '#3b82f6' } }, '🌉 Cross-Chain Bridge'),
                    React.createElement('p', { style: { marginBottom: '15px' } }, 'Transfer assets between chains'),
                    React.createElement('button', {
                        style: { 
                            background: '#3b82f6', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 20px', 
                            borderRadius: '8px', 
                            cursor: 'pointer' 
                        },
                        onClick: () => alert('🌉 Bridge functionality coming soon! (Mock)')
                    }, 'Start Bridge')
                );
            },
            Staking: function(props) {
                return React.createElement('div', {
                    style: { 
                        padding: '25px', 
                        border: '2px solid #8b5cf6', 
                        borderRadius: '15px', 
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                        textAlign: 'center',
                        minHeight: '200px'
                    }
                },
                    React.createElement('h4', { style: { marginBottom: '15px', color: '#8b5cf6' } }, '📈 Staking Pool'),
                    React.createElement('p', { style: { marginBottom: '10px' } }, 'APY: 12.5%'),
                    React.createElement('p', { style: { marginBottom: '15px' } }, 'Your Stake: 0 tokens'),
                    React.createElement('button', {
                        style: { 
                            background: '#8b5cf6', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 20px', 
                            borderRadius: '8px', 
                            cursor: 'pointer' 
                        },
                        onClick: () => alert('📈 Staking interface opening! (Mock)')
                    }, 'Stake Tokens')
                );
            },
            Faucet: function(props) {
                const [claimed, setClaimed] = React.useState(false);
                
                return React.createElement('div', {
                    style: { 
                        padding: '25px', 
                        border: '2px solid #f59e0b', 
                        borderRadius: '15px', 
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
                        textAlign: 'center',
                        minHeight: '200px'
                    }
                },
                    React.createElement('h4', { style: { marginBottom: '15px', color: '#f59e0b' } }, '🚰 Token Faucet'),
                    React.createElement('p', { style: { marginBottom: '15px' } }, 'Get free testnet tokens'),
                    React.createElement('button', {
                        style: { 
                            background: claimed ? '#6b7280' : '#f59e0b', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 20px', 
                            borderRadius: '8px', 
                            cursor: claimed ? 'not-allowed' : 'pointer' 
                        },
                        disabled: claimed,
                        onClick: () => {
                            setClaimed(true);
                            alert('🚰 100 Test Tokens claimed! (Mock)');
                            setTimeout(() => setClaimed(false), 5000);
                        }
                    }, claimed ? 'Claimed ✅' : 'Claim Tokens')
                );
            }
        };
        
        console.log('✅ Mock HyperionKit components loaded successfully!');
        console.log('🎯 Components available:', Object.keys(window.HyperionKit));
    </script>
    
    <script type="text/babel">
        function App() {
            const [counter, setCounter] = React.useState(0);
            const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleString());
            const [message, setMessage] = React.useState('Hello from React!');
            const [likes, setLikes] = React.useState(0);
            
            React.useEffect(() => {
                const timer = setInterval(() => {
                    setCurrentTime(new Date().toLocaleString());
                }, 1000);
                return () => clearInterval(timer);
            }, []);
            
            const showAlert = (feature) => {
                alert('🎉 You clicked on ' + feature + ' feature! This is a fully interactive app with HyperionKit!');
            };
            
            const launchDApp = () => {
                const messages = [
                    '🚀 Initializing Web3 connection...',
                    '⚡ Loading smart contracts...',
                    '🔗 Connecting to blockchain...',
                    '✅ DApp ready! Welcome to the future!'
                ];
                
                let i = 0;
                const interval = setInterval(() => {
                    alert(messages[i]);
                    i++;
                    if (i >= messages.length) {
                        clearInterval(interval);
                    }
                }, 1000);
            };
            
            // Check if HyperionKit is loaded
            const HyperionKit = window.HyperionKit;
            let ConnectWallet, Swap, Bridge, Staking, Faucet, HyperkitProvider;
            
            if (HyperionKit) {
                ({ ConnectWallet, Swap, Bridge, Staking, Faucet, HyperkitProvider } = HyperionKit);
            }
            
            const renderWithProvider = (content) => {
                if (HyperkitProvider) {
                    return React.createElement(HyperkitProvider, null, content);
                }
                return content;
            };
            
            const appContent = React.createElement('div', null,
                // Wallet section
                React.createElement('div', { className: 'wallet-section' },
                    ConnectWallet ? React.createElement(ConnectWallet) : 
                    React.createElement('div', { 
                        style: { 
                            background: '#667eea', 
                            color: 'white', 
                            padding: '10px 20px', 
                            borderRadius: '10px',
                            cursor: 'pointer'
                        },
                        onClick: () => alert('HyperionKit ConnectWallet would appear here!')
                    }, '� Connect Wallet')
                ),
                
                // Main container
                React.createElement('div', { className: 'container' },
                    // Header
                    React.createElement('div', { className: 'header' },
                        React.createElement('h1', null, '${projectName}'),
                        React.createElement('p', null, 'Built with HyperionKit - Web3 Made Simple')
                    ),
                    
                    // Interactive section
                    React.createElement('div', { className: 'interactive-section' },
                        React.createElement('h2', null, '� Live Interactive Demo'),
                        
                        // Real-time clock
                        React.createElement('div', { className: 'live-time' },
                            '🕐 Current Time: ' + currentTime
                        ),
                        
                        // Counter
                        React.createElement('div', { className: 'counter' },
                            React.createElement('h3', null, 'Interactive Counter'),
                            React.createElement('button', { 
                                onClick: () => setCounter(counter - 1) 
                            }, '-'),
                            React.createElement('span', { 
                                style: { fontSize: '2rem', margin: '0 20px' } 
                            }, counter),
                            React.createElement('button', { 
                                onClick: () => setCounter(counter + 1) 
                            }, '+')
                        ),
                        
                        // React demo
                        React.createElement('div', { className: 'react-demo' },
                            React.createElement('h3', null, '⚛️ React Component Running Live'),
                            React.createElement('p', { style: { marginBottom: '10px' } }, message),
                            React.createElement('button', {
                                onClick: () => setLikes(likes + 1),
                                style: { 
                                    background: '#3b82f6', 
                                    color: 'white', 
                                    padding: '8px 16px', 
                                    border: 'none', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                }
                            }, '👍 Like (' + likes + ')'),
                            React.createElement('button', {
                                onClick: () => setMessage(message === 'Hello from React!' ? '🎉 React is working perfectly!' : 'Hello from React!'),
                                style: { 
                                    background: '#10b981', 
                                    color: 'white', 
                                    padding: '8px 16px', 
                                    border: 'none', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer' 
                                }
                            }, 'Toggle Message')
                        )
                    ),
                    
                    // Features
                    React.createElement('div', { className: 'features' },
                        React.createElement('div', { 
                            className: 'feature-card',
                            onClick: () => showAlert('Lightning Fast')
                        },
                            React.createElement('h3', null, '🚀 Lightning Fast'),
                            React.createElement('p', null, 'Built with modern Web3 technologies for optimal performance and user experience. Click me!')
                        ),
                        React.createElement('div', { 
                            className: 'feature-card',
                            onClick: () => showAlert('Secure')
                        },
                            React.createElement('h3', null, '🔒 Secure'),
                            React.createElement('p', null, 'Industry-standard security practices and audited smart contracts ensure your assets are safe. Interactive!')
                        ),
                        React.createElement('div', { 
                            className: 'feature-card',
                            onClick: () => showAlert('Cross-Chain')
                        },
                            React.createElement('h3', null, '🌐 Cross-Chain'),
                            React.createElement('p', null, 'Seamless integration across multiple blockchain networks with our bridge technology. Try clicking!')
                        )
                    ),
                    
                    // HyperionKit Components
                    React.createElement('div', { className: 'dapp-components' },
                        React.createElement('h2', null, '🔥 HyperionKit Components'),
                        React.createElement('div', { className: 'components-grid' },
                            React.createElement('div', { className: 'component-container' },
                                React.createElement('h3', null, '💱 Token Swap'),
                                Swap ? React.createElement(Swap) : 
                                React.createElement('p', null, 'HyperionKit Swap component would render here')
                            ),
                            React.createElement('div', { className: 'component-container' },
                                React.createElement('h3', null, '🌉 Bridge'),
                                Bridge ? React.createElement(Bridge) : 
                                React.createElement('p', null, 'HyperionKit Bridge component would render here')
                            ),
                            React.createElement('div', { className: 'component-container' },
                                React.createElement('h3', null, '📈 Staking'),
                                Staking ? React.createElement(Staking) : 
                                React.createElement('p', null, 'HyperionKit Staking component would render here')
                            ),
                            React.createElement('div', { className: 'component-container' },
                                React.createElement('h3', null, '🚰 Faucet'),
                                Faucet ? React.createElement(Faucet) : 
                                React.createElement('p', null, 'HyperionKit Faucet component would render here')
                            )
                        )
                    ),
                    
                    // CTA section
                    React.createElement('div', { className: 'cta-section' },
                        React.createElement('h2', null, 'Ready to Get Started?'),
                        React.createElement('p', null, 'Connect your wallet and start exploring the decentralized web'),
                        React.createElement('button', { 
                            className: 'cta-button',
                            onClick: launchDApp
                        }, 'Explore DApp')
                    )
                )
            );
            
            return renderWithProvider(appContent);
        }
        
        // Wait for HyperionKit to load before rendering
        function initApp() {
            console.log('${projectName} loaded successfully!');
            console.log('� Full JavaScript support enabled!');
            console.log('⚛️ React components working!');
            console.log('🎯 Interactive features active!');
            
            if (window.HyperionKit) {
                console.log('✅ HyperionKit loaded:', Object.keys(window.HyperionKit));
            } else {
                console.log('⚠️ HyperionKit not found - using fallback components');
            }
            
            ReactDOM.render(React.createElement(App), document.getElementById('root'));
        }
        
        // Listen for app ready event
        window.addEventListener('app-ready', initApp);
    </script>
</body>
</html>`;
}
