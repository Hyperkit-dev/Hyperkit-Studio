import React from 'react';
import { Bell, Settings, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="h-16 border-b border-[#1F1F22] bg-[#050814] flex items-center justify-between px-6 z-40 shrink-0">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-3 w-64">
        <img
          src="/Hyperkit Header White.png"
          alt="Hyperkit Logo"
          className="h-10 object-contain" // optimized height
        />
      </div>

      {/* Center Nav */}
      <div className="hidden md:flex items-center bg-[#0B1020] rounded-full p-1 border border-[#1F1F22]">
        <button className="px-5 py-1.5 rounded-full text-xs font-medium bg-[#1F1F22] text-white shadow-sm border border-[#27272A]">
          Dashboard
        </button>
        <button className="px-5 py-1.5 rounded-full text-xs font-medium text-[#9CA3AF] hover:text-white transition-colors">
          Designer
        </button>
        <button className="px-5 py-1.5 rounded-full text-xs font-medium text-[#9CA3AF] hover:text-white transition-colors">
          Preview
        </button>
        <button className="px-5 py-1.5 rounded-full text-xs font-medium text-[#9CA3AF] hover:text-white transition-colors">
          Code
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center justify-end gap-4 w-64">
        <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101322] border border-[#27272A] hover:border-purple-500/30 transition-colors group">
          <div className="relative flex items-center justify-center w-2 h-2">
            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full z-10" />
          </div>
          <span className="text-[11px] font-medium text-[#E5E7EB] group-hover:text-white">
            Hyperion Mainnet
          </span>
          <ChevronDown className="w-3 h-3 text-[#52525B]" />
        </button>

        <div className="h-5 w-px bg-[#27272A] hidden sm:block" />

        <div className="flex items-center gap-3">
          <button className="text-[#9CA3AF] hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#050814]" />
          </button>

          <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1px]">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hyper"
              alt="User"
              className="w-full h-full rounded-full bg-[#050814]"
            />
          </button>

          <button className="text-[#9CA3AF] hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
