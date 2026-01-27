import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Pin,
  PlusCircle,
  Bot,
  FileCode,
  File,
  Image as ImageIcon,
  X,
  Paperclip,
  Mic,
  ArrowUp,
} from 'lucide-react';

interface RightChatPanelProps {
  showToast: (message: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp?: string;
  fileContext?: string;
}

export const RightChatPanel: React.FC<RightChatPanelProps> = ({ showToast }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Today, 2:41 PM',
    },
    {
      id: '2',
      type: 'user',
      content:
        'Wrap the current flow in a centered wizard component and allow Smart Wallet connection using EIP-7702.',
      timestamp: 'Just now',
      fileContext: 'src/App.tsx',
    },
    {
      id: '3',
      type: 'ai',
      content: 'ai-response',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    showToast('Request sent to HyperAgent');
    setInputValue('');
  };

  return (
    <aside className="w-96 bg-[#09090b] border-l border-white/10 flex flex-col shrink-0 z-20">
      <style>{`
        /* Custom Scrollbar for Chat */
        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        /* Animation */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .msg-animate {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
      {/* Chat Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#09090b]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-white leading-none">
              HyperAgent
            </div>
            <div className="text-[10px] text-gray-500 font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{' '}
              Thinking...
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
            title="Pin Context"
          >
            <Pin className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
            title="New Chat"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div
        ref={chatContainerRef}
        className="chat-scrollbar flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.map((message) => {
          if (message.type === 'system') {
            return (
              <div key={message.id} className="flex justify-center">
                <span className="text-[10px] text-gray-600 font-medium">
                  {message.content}
                </span>
              </div>
            );
          }

          if (message.type === 'user') {
            return (
              <div key={message.id} className="flex flex-col items-end gap-1 group">
                <div className="bg-[#27272a] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm border border-white/5 max-w-[90%] text-sm leading-relaxed shadow-sm">
                  {message.content}
                </div>
                <span className="text-[10px] text-gray-600 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {message.timestamp} • {message.fileContext}
                </span>
              </div>
            );
          }

          if (message.type === 'ai') {
            return (
              <div key={message.id} className="flex flex-col items-start gap-2 max-w-full msg-animate">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
                    <Bot className="w-2.5 h-2.5 text-indigo-400" />
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-400">
                    HyperAgent
                  </span>
                </div>

                <div className="text-[13px] text-gray-300 leading-relaxed space-y-2">
                  <p>
                    I can help with that. I've restructured{' '}
                    <code className="bg-white/10 px-1 py-0.5 rounded text-gray-200 text-[11px]">
                      App.tsx
                    </code>{' '}
                    to include a centered layout container.
                  </p>
                  <p>
                    I also imported the{' '}
                    <code className="bg-white/10 px-1 py-0.5 rounded text-gray-200 text-[11px]">
                      SmartWallet
                    </code>{' '}
                    component and configured it for Base chain. Here is the
                    plan:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-400">
                    <li>Add flexbox centering classes.</li>
                    <li>
                      Replace <code className="text-xs">ConnectButton</code>{' '}
                      with full wallet UI.
                    </li>
                    <li>Update theme config.</li>
                  </ul>
                </div>

                {/* AI Action Card */}
                <AIActionCard showToast={showToast} />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Task Context */}
      <div className="px-4 py-2 border-t border-white/10 bg-[#0c0c0e]">
        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
          <span className="font-medium uppercase tracking-wider">Context</span>
          <span className="text-xs hover:text-white cursor-pointer">Clear</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <ContextTag icon={<File className="w-3 h-3" />} label="App.tsx" />
          <ContextTag
            icon={<ImageIcon className="w-3 h-3" />}
            label="mock_v2.png"
          />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#09090b]">
        <div className="relative bg-[#18181b] border border-white/10 rounded-xl shadow-lg focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent text-white text-[13px] px-3 py-3 min-h-[50px] max-h-32 focus:outline-none resize-none placeholder:text-gray-600"
            placeholder="Describe changes or ask a question..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex gap-1">
              <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-[#09090b] text-[10px] text-gray-400 border border-white/10 rounded px-2 py-1 focus:outline-none">
                <option>Refactor</option>
                <option>Explain</option>
                <option>Generate</option>
              </select>
              <button
                onClick={handleSend}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg p-1.5 shadow-md shadow-indigo-500/20 transition-all active:scale-95"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-center text-gray-600 mt-2">
          Hyperkit v2.4 • AI can make mistakes.
        </div>
      </div>
    </aside>
  );
};

// Helper Components
interface AIActionCardProps {
  showToast: (message: string) => void;
}

const AIActionCard: React.FC<AIActionCardProps> = ({ showToast }) => {
  return (
    <div className="mt-2 w-full bg-[#18181b] border border-white/10 rounded-lg p-3 overflow-hidden group hover:border-indigo-500/30 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-[11px] text-gray-300">
            src/App.tsx
          </span>
        </div>
        <span className="text-[10px] text-green-400 font-medium">
          +8 lines
        </span>
      </div>
      <div className="bg-[#050505] p-2 rounded border border-white/5 font-mono text-[10px] text-gray-500 mb-3 overflow-x-hidden whitespace-nowrap">
        &lt;SmartWallet chain="base" theme="dark" /&gt;
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => showToast('Applying changes...')}
          className="flex-1 bg-white text-black py-1.5 rounded text-xs font-semibold hover:bg-gray-200 transition-colors"
        >
          Apply to File
        </button>
        <button className="flex-1 bg-[#27272a] text-white py-1.5 rounded text-xs font-medium border border-white/10 hover:bg-[#3f3f46] transition-colors">
          View Diff
        </button>
      </div>
    </div>
  );
};

interface ContextTagProps {
  icon: React.ReactNode;
  label: string;
}

const ContextTag: React.FC<ContextTagProps> = ({ icon, label }) => {
  return (
    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-[10px] flex items-center gap-1">
      {icon} {label}
      <X className="w-3 h-3 cursor-pointer hover:text-white" />
    </span>
  );
};