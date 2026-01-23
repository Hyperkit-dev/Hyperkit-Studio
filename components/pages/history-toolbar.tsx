import React from 'react';
import { Download, FolderGit2, Filter, Calendar, ChevronDown } from 'lucide-react';

export const HistoryToolbar = () => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight mb-1">Activity History</h1>
          <p className="text-[#9CA3AF] text-xs">View and manage your project lifecycle events.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#27272A] hover:bg-[#18181B] text-xs text-[#E5E7EB] transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pb-2">
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0B1020] border border-[#27272A] hover:border-[#3F3F46] text-xs text-white transition-colors">
            <FolderGit2 className="w-3.5 h-3.5 text-[#9CA3AF]" />
            All Projects
            <ChevronDown className="w-3 h-3 text-[#52525B]" />
          </button>
        </div>
        
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0B1020] border border-[#27272A] hover:border-[#3F3F46] text-xs text-white transition-colors">
            <Filter className="w-3.5 h-3.5 text-[#9CA3AF]" />
            Event Type
            <ChevronDown className="w-3 h-3 text-[#52525B]" />
          </button>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0B1020] border border-[#27272A] hover:border-[#3F3F46] text-xs text-white transition-colors">
            <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
            Date Range
            <ChevronDown className="w-3 h-3 text-[#52525B]" />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 text-xs text-[#52525B]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Success
          <span className="w-2 h-2 rounded-full bg-blue-500 ml-2" /> Pending
          <span className="w-2 h-2 rounded-full bg-red-500 ml-2" /> Failed
        </div>
      </div>
    </div>
  );
};