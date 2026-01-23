import React from 'react';
import { Info } from 'lucide-react';

export const ProjectDetails = () => {
  return (
    <div className="bg-[#101322] border border-[#1F1F22]/20 shadow-[0_18px_40px_rgba(0,0,0,0.55)] rounded-xl p-5 flex flex-col">
      <h3 className="font-medium text-white mb-4 flex items-center gap-2 text-sm">
        <Info className="w-4 h-4 text-[#7C3AED]" /> Project Details
      </h3>
      <div className="space-y-4 flex-1">
        <div className="flex justify-between items-center py-2 border-b border-[#1F1F22]">
          <span className="text-[#9CA3AF] text-xs">Title</span>
          <span className="text-white text-xs font-medium">DeFi Swap Protocol</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#1F1F22]">
          <span className="text-[#9CA3AF] text-xs">Type</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            DApp
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#1F1F22]">
          <span className="text-[#9CA3AF] text-xs">Framework</span>
          <span className="text-white text-xs font-medium">React + Wagmi</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#1F1F22]">
          <span className="text-[#9CA3AF] text-xs">Mode</span>
          <span className="text-white text-xs font-medium">Production</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-[#9CA3AF] text-xs">Created</span>
          <span className="text-[#D4D4D8] text-xs">Oct 24, 2023</span>
        </div>
      </div>
    </div>
  );
};