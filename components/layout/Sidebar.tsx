'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Folder, LayoutTemplate, Bot, Rocket, Logs,
  LineChart, Blocks, Layout, BarChart2, Globe, History, Plus, Library
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 scrollbar-none bg-[#050814] border-r border-[#1F1F22] flex flex-col shrink-0 transition-all duration-300 hidden md:flex">
      {/* Conditional Header Content */}
      {pathname === '/overview' && (
        <div className="p-4 border-b border-[#1F1F22]">
          <h3 className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3 pl-1">
            What would you like to build?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="col-span-2 flex items-center gap-2 p-2 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors group text-left">
              <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Blocks className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-white group-hover:text-purple-200">
                DApp Project
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border border-[#27272A] hover:border-[#3F3F46] bg-[#0B1020] hover:bg-[#18181B] transition-colors group">
              <Layout className="w-4 h-4 text-[#9CA3AF] group-hover:text-white" />
              <span className="text-[10px] text-[#9CA3AF]">Landing</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border border-[#27272A] hover:border-[#3F3F46] bg-[#0B1020] hover:bg-[#18181B] transition-colors group">
              <BarChart2 className="w-4 h-4 text-[#9CA3AF] group-hover:text-white" />
              <span className="text-[10px] text-[#9CA3AF]">Analytics</span>
            </button>
          </div>
        </div>
      )}

      {pathname === '/projects' && (
        <div className="p-3 pb-0">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white py-2 rounded-lg text-xs font-medium transition-all group shadow-[0_2px_10px_rgba(124,58,237,0.3)]">
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
            New Project
          </button>
        </div>
      )}

      {pathname === '/agents' && (
        <div className="p-3 pb-0">
          <div className="mb-4 space-y-2">
            <button className="w-full flex items-center gap-2 justify-center py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all">
              <Plus className="w-3.5 h-3.5" /> New Agent
            </button>
            <button className="w-full flex items-center gap-2 justify-center py-2 rounded-lg bg-[#0B1020] border border-[#27272A] hover:bg-[#18181B] text-[#D4D4D8] text-xs font-medium transition-colors">
              <Library className="w-3.5 h-3.5 text-[#9CA3AF]" /> Browse Presets
            </button>
          </div>
          <div className="h-px bg-[#1F1F22] mb-2" />
        </div>
      )}

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-none">
        <a 
          href="/overview" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            pathname === '/overview' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span className={pathname === '/overview' ? 'font-medium' : ''}>Overview</span>
        </a>
        
        <a 
          href="/projects" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/projects' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <Folder className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/projects' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/projects' ? 'font-medium' : ''}>Projects</span>
        </a>

        <a 
          href="/template" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/template' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <LayoutTemplate className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/template' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/template' ? 'font-medium' : ''}>Templates</span>
        </a>

        <a 
          href="/agents" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/agents' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <Bot className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/agents' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/agents' ? 'font-medium' : ''}>Agents</span>
        </a>
        
        <div className="my-3 h-px bg-[#1F1F22] mx-3" />

        <div className="px-3 py-2 text-[10px] font-semibold text-[#52525B] uppercase tracking-wider">
          Observability
        </div>
        
        <a 
          href="/history" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/history' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <History className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/history' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/history' ? 'font-medium' : ''}>History</span>
        </a>

        <a 
          href="/analytics" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/analytics' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <LineChart className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/analytics' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/analytics' ? 'font-medium' : ''}>Analytics</span>
        </a>

        <a 
          href="/logs" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/logs' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <Logs className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/logs' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/logs' ? 'font-medium' : ''}>Logs</span>
        </a>

        <div className="my-3 h-px bg-[#1F1F22] mx-3" />

        <div className="px-3 py-2 text-[10px] font-semibold text-[#52525B] uppercase tracking-wider">
          Infrastructure
        </div>
        
        <a 
          href="/domain" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/domain' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <Globe className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/domain' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/domain' ? 'font-medium' : ''}>Domain</span>
        </a>
        
        <a 
          href="/deployments" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
            pathname === '/deployments' 
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
              : 'text-[#9CA3AF] hover:bg-[#101322] hover:text-white'
          }`}
        >
          <Rocket className={`w-4 h-4 shrink-0 transition-colors ${
            pathname === '/deployments' ? 'text-purple-400' : 'group-hover:text-purple-400'
          }`} />
          <span className={pathname === '/deployments' ? 'font-medium' : ''}>Deployments</span>
        </a>
      </nav>
      
      <div className="p-4 border-t border-[#1F1F22] text-[11px] text-[#52525B]">
        Hyperkit CLI v2.4.0
      </div>
    </aside>
  );
};
