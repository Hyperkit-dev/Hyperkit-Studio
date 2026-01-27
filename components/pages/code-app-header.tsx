import React from 'react';
import { ChevronRight } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#050505] shrink-0 z-50">
      {/* Left: Branding & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="h-4 w-[1px] bg-white/10"></div>
        <div className="flex items-center text-gray-500 gap-2">
          <span className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-white cursor-pointer transition-colors">Agents</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium">Chat Builder</span>
        </div>
      </div>

      {/* Right: Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2 py-1 bg-[#18181b] border border-white/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          <span className="text-[11px] font-medium text-gray-300">Hyperion Testnet</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-white/20 flex items-center justify-center text-[10px] font-bold">
          JD
        </div>
      </div>
    </header>
  );
};