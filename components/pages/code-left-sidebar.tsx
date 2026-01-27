import React from 'react';
import {
  ChevronsUpDown,
  LayoutGrid,
  Code2,
  Database,
  Bot,
  ChevronDown,
  FolderOpen,
  FileJson,
  FileCode2,
  Sheet,
  Plus,
  PlayCircle,
  TerminalSquare,
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#09090b] border-r border-white/10 flex flex-col shrink-0">
      <style>{`
        /* Custom Scrollbar for Sidebar */
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
      {/* Project Selector */}
      <div className="p-3 border-b border-white/10">
        <button className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-white/5 rounded-md transition-colors group">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">
              P
            </div>
            <span className="font-medium text-gray-200">Portfolio dApp</span>
          </div>
          <ChevronsUpDown className="w-3 h-3 text-gray-600 group-hover:text-gray-400" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="p-2 space-y-0.5 border-b border-white/5">
        <a
          href="#"
          className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        >
          <LayoutGrid className="w-3.5 h-3.5" /> Overview
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-2 py-1.5 text-white bg-white/10 rounded-md transition-colors font-medium"
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Code
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        >
          <Database className="w-3.5 h-3.5" /> Data
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        >
          <Bot className="w-3.5 h-3.5" /> Agents
        </a>
      </nav>

      {/* File Explorer */}
      <div className="sidebar-scrollbar flex-1 overflow-y-auto p-2">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-2 mt-2">
          Files
        </div>

        <div className="space-y-0.5 font-mono text-[12px]">
          {/* Folder Open */}
          <div className="flex items-center gap-1.5 px-2 py-1 text-gray-400 hover:text-white cursor-pointer">
            <ChevronDown className="w-3 h-3" />
            <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>src</span>
          </div>

          {/* Nested Files */}
          <div className="pl-6 space-y-0.5">
            <div className="flex items-center gap-1.5 px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded cursor-pointer">
              <FileJson className="w-3.5 h-3.5 text-yellow-400" />
              <span>config.json</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#27272a] text-white rounded cursor-pointer border-l-2 border-indigo-500">
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>App.tsx</span>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full ml-auto"></div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded cursor-pointer">
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>WalletProvider.tsx</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded cursor-pointer">
              <Sheet className="w-3.5 h-3.5 text-pink-400" />
              <span>global.css</span>
            </div>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="mt-6">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-2 flex justify-between items-center">
            <span>Active Tasks</span>
            <Plus className="w-3 h-3 cursor-pointer hover:text-white" />
          </div>
          <div className="space-y-1 px-2">
            <div className="p-2 bg-[#18181b] border border-white/5 rounded-md hover:border-white/20 cursor-pointer transition-colors group">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                </div>
                <div>
                  <div className="text-xs text-gray-200 group-hover:text-white">
                    Refactor Auth Flow
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    App.tsx • Just now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="h-10 border-t border-white/10 flex items-center px-3 gap-3 bg-[#09090b]">
        <button className="text-gray-500 hover:text-white">
          <PlayCircle className="w-3.5 h-3.5" />
        </button>
        <button className="text-gray-500 hover:text-white">
          <TerminalSquare className="w-3.5 h-3.5" />
        </button>
        <div className="ml-auto text-[10px] text-gray-600 font-mono">
          dev-branch-01
        </div>
      </div>
    </aside>
  );
};