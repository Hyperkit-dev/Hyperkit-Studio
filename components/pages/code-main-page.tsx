import React, { useState } from 'react';
import {
  GitCompare,
  Eye,
  LayoutPanelLeft,
  CheckCircle2,
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  Mail,
  Zap,
} from 'lucide-react';

interface WorkspaceMainProps {
  showToast: (message: string) => void;
}

export const WorkspaceMain: React.FC<WorkspaceMainProps> = ({ showToast }) => {
  const [viewMode, setViewMode] = useState<'diff' | 'preview'>('diff');

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#030303] border-r border-white/10 relative">
      {/* Workspace Header */}
      <div className="h-10 border-b border-white/10 flex items-center justify-between px-3 bg-[#030303]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-mono">src/App.tsx</span>
          <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-[10px] font-medium border border-yellow-500/20">
            Modified
          </span>
        </div>

        {/* Toggle: Diff vs Preview */}
        <div className="flex bg-[#18181b] p-0.5 rounded-md border border-white/10">
          <button
            onClick={() => setViewMode('diff')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              viewMode === 'diff'
                ? 'bg-[#27272a] text-white border border-white/5 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <GitCompare className="w-3 h-3" /> Diff View
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-[#27272a] text-white border border-white/5 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" /> UI Preview
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/10 rounded text-gray-500 hover:text-white">
            <LayoutPanelLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CODE DIFF VIEW */}
      {viewMode === 'diff' && (
        <div className="flex-1 flex font-mono text-[12px] leading-6 overflow-hidden">
          {/* Left: Original */}
          <div className="flex-1 border-r border-white/5 bg-[#030303] overflow-auto">
            <div className="sticky top-0 bg-[#030303]/80 backdrop-blur border-b border-white/5 px-4 py-1 text-[10px] text-gray-500 uppercase tracking-wider font-bold z-10">
              Original
            </div>
            <div className="p-4 pt-2">
              <CodeLine num={14} className="text-gray-500">
                <span className="syntax-keyword">import</span> {'{'}
                ConnectButton {'}'} <span className="syntax-keyword">from</span>{' '}
                <span className="syntax-string">'@hyperkit/react'</span>;
              </CodeLine>
              <CodeLine num={15} className="text-gray-500" />
              <CodeLine num={16} className="text-gray-500">
                <span className="syntax-keyword">export default function</span>{' '}
                <span className="syntax-func">App</span>() {'{'}
              </CodeLine>
              <CodeLine num={17} className="text-gray-500">
                {'  '}
                <span className="syntax-keyword">return</span> (
              </CodeLine>
              <CodeLine num={18} className="text-gray-500 diff-remove">
                {'    '}
                <span className="syntax-tag">&lt;div</span>{' '}
                <span className="syntax-attr">className</span>=
                <span className="syntax-string">"p-4"</span>
                <span className="syntax-tag">&gt;</span>
              </CodeLine>
              <CodeLine num={19} className="text-gray-500 diff-remove">
                {'      '}
                <span className="syntax-tag">&lt;ConnectButton</span>{' '}
                <span className="syntax-tag">/&gt;</span>
              </CodeLine>
              <CodeLine num={20} className="text-gray-500 diff-remove">
                {'    '}
                <span className="syntax-tag">&lt;/div&gt;</span>
              </CodeLine>
              <CodeLine num={21} className="text-gray-500">
                {'  '});
              </CodeLine>
              <CodeLine num={22} className="text-gray-500">
                {'}'}
              </CodeLine>
            </div>
          </div>

          {/* Right: Suggested */}
          <div className="flex-1 bg-[#050505] overflow-auto">
            <div className="sticky top-0 bg-[#050505]/80 backdrop-blur border-b border-white/5 px-4 py-1 text-[10px] text-emerald-500 uppercase tracking-wider font-bold z-10 flex justify-between">
              <span>Suggested Change (AI)</span>
              <div className="flex gap-2">
                <button className="hover:text-white transition-colors">
                  Reject
                </button>
                <button
                  onClick={() => showToast('Applying changes...')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
            <div className="p-4 pt-2">
              <CodeLine num={14} className="text-gray-300">
                <span className="syntax-keyword">import</span> {'{'}
                ConnectButton, SmartWallet {'}'}{' '}
                <span className="syntax-keyword">from</span>{' '}
                <span className="syntax-string">'@hyperkit/react'</span>;
              </CodeLine>
              <CodeLine num={15} className="text-gray-300" />
              <CodeLine num={16} className="text-gray-300">
                <span className="syntax-keyword">export default function</span>{' '}
                <span className="syntax-func">App</span>() {'{'}
              </CodeLine>
              <CodeLine num={17} className="text-gray-300">
                {'  '}
                <span className="syntax-keyword">return</span> (
              </CodeLine>
              <CodeLine num={18} className="text-gray-200 diff-add">
                {'    '}
                <span className="syntax-tag">&lt;div</span>{' '}
                <span className="syntax-attr">className</span>=
                <span className="syntax-string">
                  "flex flex-col items-center justify-center min-h-screen
                  bg-black"
                </span>
                <span className="syntax-tag">&gt;</span>
              </CodeLine>
              <CodeLine num={19} className="text-gray-200 diff-add">
                {'      '}
                <span className="syntax-tag">&lt;div</span>{' '}
                <span className="syntax-attr">className</span>=
                <span className="syntax-string">
                  "p-8 border border-white/10 rounded-xl bg-zinc-900"
                </span>
                <span className="syntax-tag">&gt;</span>
              </CodeLine>
              <CodeLine num={20} className="text-gray-200 diff-add">
                {'         '}
                <span className="syntax-tag">&lt;h1</span>{' '}
                <span className="syntax-attr">className</span>=
                <span className="syntax-string">
                  "text-xl font-bold text-white mb-4"
                </span>
                <span className="syntax-tag">&gt;</span>Login
                <span className="syntax-tag">&lt;/h1&gt;</span>
              </CodeLine>
              <CodeLine num={21} className="text-gray-200 diff-add">
                {'         '}
                <span className="syntax-tag">&lt;SmartWallet</span>
              </CodeLine>
              <CodeLine num={22} className="text-gray-200 diff-add">
                {'            '}
                <span className="syntax-attr">chain</span>=
                <span className="syntax-string">"base"</span>
              </CodeLine>
              <CodeLine num={23} className="text-gray-200 diff-add">
                {'            '}
                <span className="syntax-attr">theme</span>=
                <span className="syntax-string">"dark"</span>
              </CodeLine>
              <CodeLine num={24} className="text-gray-200 diff-add">
                {'         '}
                <span className="syntax-tag">/&gt;</span>
              </CodeLine>
              <CodeLine num={25} className="text-gray-200 diff-add">
                {'      '}
                <span className="syntax-tag">&lt;/div&gt;</span>
              </CodeLine>
              <CodeLine num={26} className="text-gray-200 diff-add">
                {'    '}
                <span className="syntax-tag">&lt;/div&gt;</span>
              </CodeLine>
              <CodeLine num={27} className="text-gray-300">
                {'  '});
              </CodeLine>
              <CodeLine num={28} className="text-gray-300">
                {'}'}
              </CodeLine>
            </div>
          </div>
        </div>
      )}

      {/* UI PREVIEW */}
      {viewMode === 'preview' && (
        <div className="flex-1 bg-[#101012] flex flex-col relative overflow-hidden">
          <div className="h-8 border-b border-white/5 flex items-center justify-center gap-4 bg-[#0a0a0c]">
            <button className="text-white bg-white/10 p-1 rounded">
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button className="text-gray-500 hover:text-white p-1 rounded">
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button className="text-gray-500 hover:text-white p-1 rounded">
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 p-8 flex justify-center items-center overflow-auto bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="w-full h-full max-w-[90%] max-h-[90%] bg-black border border-white/10 rounded-xl shadow-2xl flex flex-col items-center justify-center relative">
              {/* Preview Content */}
              <div className="p-8 border border-white/10 rounded-xl bg-zinc-900 w-[340px]">
                <h1 className="text-xl font-bold text-white mb-4 font-sans">
                  Login
                </h1>
                <div className="space-y-3">
                  <button className="w-full bg-[#333] hover:bg-[#444] text-white py-2 rounded-lg font-medium text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </button>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-indigo-500/20">
                    Connect Wallet
                  </button>
                </div>
              </div>

              {/* Hot Reload Badge */}
              <div className="absolute bottom-4 right-4 bg-zinc-800 border border-white/10 text-xs px-2 py-1 rounded-md text-green-400 flex items-center gap-1.5 shadow-lg">
                <Zap className="w-3 h-3 fill-current" /> Hot Reloaded
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Footer */}
      <div className="h-8 border-t border-white/10 bg-[#09090b] flex items-center justify-between px-3 text-[11px] text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" /> No errors
          </span>
          <span className="flex items-center gap-1 hover:text-gray-300 cursor-pointer">
            <Terminal className="w-3 h-3" /> Output
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono">Ln 18, Col 4</span>
          <span className="font-mono">UTF-8</span>
          <span className="font-mono">TypeScript React</span>
        </div>
      </div>
    </main>
  );
};

// Helper component for code lines
interface CodeLineProps {
  num: number;
  className?: string;
  children?: React.ReactNode;
}

const CodeLine: React.FC<CodeLineProps> = ({ num, className = '', children }) => {
  return (
    <div className={`flex select-none ${className}`}>
      <span className="w-8 text-right pr-3 text-gray-600 opacity-50">
        {num}
      </span>
      <span>{children}</span>
    </div>
  );
};