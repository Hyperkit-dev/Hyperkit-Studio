import React from 'react';
import { Folder, Globe, ChevronDown, Calendar } from 'lucide-react';

export const AnalyticsToolbar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-white tracking-tight mr-2">Project Analytics</h1>
        
        {/* Project Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Folder className="h-3.5 w-3.5 text-[#52525B]" />
          </div>
          <select className="appearance-none bg-[#0B1020] border border-[#27272A] text-white text-xs rounded-lg pl-8 pr-8 py-1.5 focus:outline-none focus:border-purple-500/50 hover:bg-[#101322] transition-colors cursor-pointer min-w-[140px]">
            <option>DeFi Vault V2</option>
            <option>NFT Marketplace</option>
            <option>Governance DAO</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <ChevronDown className="h-3.5 w-3.5 text-[#52525B]" />
          </div>
        </div>

        {/* Network Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Globe className="h-3.5 w-3.5 text-[#52525B]" />
          </div>
          <select className="appearance-none bg-[#0B1020] border border-[#27272A] text-white text-xs rounded-lg pl-8 pr-8 py-1.5 focus:outline-none focus:border-purple-500/50 hover:bg-[#101322] transition-colors cursor-pointer min-w-[120px]">
            <option>All Networks</option>
            <option>Ethereum</option>
            <option>Polygon</option>
            <option>Arbitrum</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <ChevronDown className="h-3.5 w-3.5 text-[#52525B]" />
          </div>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-center bg-[#0B1020] border border-[#27272A] rounded-lg p-1">
        <button className="px-3 py-1 text-xs font-medium rounded text-[#71717A] hover:text-white transition-colors">
          1D
        </button>
        <button className="px-3 py-1 text-xs font-medium rounded text-[#71717A] hover:text-white transition-colors">
          7D
        </button>
        <button className="px-3 py-1 text-xs font-medium rounded bg-[#1F1F22] text-white shadow-sm border border-[#27272A]">
          30D
        </button>
        <div className="w-px h-3 bg-[#27272A] mx-1" />
        <button className="px-3 py-1 text-xs font-medium rounded text-[#71717A] hover:text-white transition-colors flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          Oct 1 - Oct 31
        </button>
      </div>
    </div>
  );
};