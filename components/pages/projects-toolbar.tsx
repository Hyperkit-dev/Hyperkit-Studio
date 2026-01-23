import React from 'react';
import { Search, Globe, Activity, Layers, ChevronDown, ArrowDown } from 'lucide-react';

export const ProjectsToolbar: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight mb-1">Projects</h1>
          <p className="text-[#9CA3AF] text-xs">Manage your dApps, contracts, and deployments.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-[#1F1F22] pb-4">
        <div className="relative w-64 group">
          <Search className="w-3.5 h-3.5 text-[#52525B] absolute left-3 top-2" />
          <input 
            type="text" 
            placeholder="Filter projects..." 
            className="w-full bg-[#0B1020] border border-[#27272A] rounded-lg py-1.5 pl-9 pr-4 text-xs text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-[#52525B] outline-none"
          />
        </div>
        
        <div className="h-6 w-px bg-[#27272A] mx-1" />

        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B1020] border border-[#27272A] hover:bg-[#18181B] text-xs text-[#E5E7EB] transition-colors">
            <Globe className="w-3.5 h-3.5 text-[#9CA3AF]" />
            Network
            <ChevronDown className="w-3 h-3 text-[#52525B]" />
          </button>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B1020] border border-[#27272A] hover:bg-[#18181B] text-xs text-[#E5E7EB] transition-colors">
            <Activity className="w-3.5 h-3.5 text-[#9CA3AF]" />
            Status
            <ChevronDown className="w-3 h-3 text-[#52525B]" />
          </button>
        </div>
        
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B1020] border border-[#27272A] hover:bg-[#18181B] text-xs text-[#E5E7EB] transition-colors">
            <Layers className="w-3.5 h-3.5 text-[#9CA3AF]" />
            Type
            <ChevronDown className="w-3 h-3 text-[#52525B]" />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#71717A] mr-2">Sort by:</span>
          <button className="flex items-center gap-2 text-xs font-medium text-white hover:text-purple-400 transition-colors">
            Last Active <ArrowDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};