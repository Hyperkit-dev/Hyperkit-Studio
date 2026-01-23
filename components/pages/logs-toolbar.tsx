import React from 'react';
import { Search, ChevronDown, Download, Settings2 } from 'lucide-react';

export const LogsToolbar: React.FC = () => {
  return (
    <div className="h-14 border-b border-[#1F1F22] bg-[#050814] flex items-center justify-between px-4 shrink-0 z-20">
      <div className="flex items-center gap-3">
        <div className="relative group">
          <Search className="w-3.5 h-3.5 text-[#52525B] absolute left-2.5 top-2" />
          <input 
            type="text" 
            placeholder="Filter logs..." 
            className="bg-[#101322] border border-[#27272A] rounded-md py-1.5 pl-8 pr-3 text-xs text-white w-48 focus:border-purple-500/50 focus:outline-none transition-colors"
          />
        </div>

        <div className="h-4 w-px bg-[#27272A]" />

        <div className="relative group">
          <select className="appearance-none bg-[#101322] border border-[#27272A] text-white text-xs rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-purple-500/50 hover:border-[#3F3F46] cursor-pointer">
            <option>All Levels</option>
            <option>Error</option>
            <option>Warning</option>
            <option>Info</option>
          </select>
          <ChevronDown className="h-3 w-3 text-[#52525B] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        <div className="relative group">
          <select className="appearance-none bg-[#101322] border border-[#27272A] text-white text-xs rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-purple-500/50 hover:border-[#3F3F46] cursor-pointer">
            <option>All Sources</option>
            <option>API Gateway</option>
            <option>Auth Service</option>
            <option>DeFi Vault Contract</option>
          </select>
          <ChevronDown className="h-3 w-3 text-[#52525B] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#D4D4D8]">Live Tail</span>
          <button className="w-8 h-4 bg-[#27272A] rounded-full relative flex items-center transition-colors hover:bg-[#3F3F46]">
            <div className="w-3 h-3 bg-emerald-400 rounded-full absolute right-0.5 shadow-sm" />
          </button>
        </div>
        
        <button className="p-1.5 text-[#71717A] hover:text-white border border-transparent hover:border-[#27272A] rounded transition-all">
          <Download className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-[#71717A] hover:text-white border border-transparent hover:border-[#27272A] rounded transition-all">
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};