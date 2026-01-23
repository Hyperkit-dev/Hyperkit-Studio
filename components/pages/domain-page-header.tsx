import React from 'react';
import { Book, Plus } from 'lucide-react';

export const DomainsPageHeader = () => {
  return (
    <div className="h-16 border-b border-[#1F1F22] bg-[#050814] flex items-center justify-between px-6 shrink-0 z-20">
      <div className="flex flex-col justify-center">
        <h1 className="text-sm font-semibold text-white">Domains & Routing</h1>
        <p className="text-[11px] text-[#71717A]">Manage custom domains and DNS configurations</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-[#1F1F22] hover:bg-[#27272A] text-white border border-[#27272A] px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2">
          <Book className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <span>Docs</span>
        </button>
        <button className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:opacity-90 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Domain</span>
        </button>
      </div>
    </div>
  );
};