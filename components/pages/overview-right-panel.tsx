"use client";
import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

export const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('properties');

  return (
    <aside className="hidden xl:flex w-80 bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 z-30">
      <div className="flex border-b border-[#1F1F22] bg-[#0B1020]">
        <button 
          onClick={() => setActiveTab('properties')}
          className={`flex-1 py-3 text-[11px] font-semibold transition-colors ${
            activeTab === 'properties' 
              ? 'text-white border-b-2 border-[#7C3AED] bg-[#7C3AED]/5' 
              : 'text-[#71717A] hover:text-white'
          }`}
        >
          Properties
        </button>
        <button 
          onClick={() => setActiveTab('assistant')}
          className={`flex-1 py-3 text-[11px] font-semibold transition-colors ${
            activeTab === 'assistant' 
              ? 'text-white border-b-2 border-[#7C3AED] bg-[#7C3AED]/5' 
              : 'text-[#71717A] hover:text-white'
          }`}
        >
          AI Assistant
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-[11px] font-semibold transition-colors ${
            activeTab === 'history' 
              ? 'text-white border-b-2 border-[#7C3AED] bg-[#7C3AED]/5' 
              : 'text-[#71717A] hover:text-white'
          }`}
        >
          History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="rounded-xl p-4 bg-gradient-to-br from-[#7C3AED]/10 to-[#050814] border border-[#7C3AED]/30 relative group">
          <div className="absolute -top-3 left-3 bg-[#050814] px-2 py-0.5 border border-[#7C3AED]/30 rounded text-[10px] text-purple-300 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> HyperAgent
          </div>
          <p className="text-[12px] text-purple-100/80 leading-relaxed mt-1">
            I've detected unused imports in your contract. Optimizing this could reduce deployment gas costs by <span className="text-white font-semibold">12%</span>.
          </p>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-medium transition-colors shadow-lg shadow-purple-900/40">
              Fix Issue
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[#7C3AED]/30 text-purple-300 hover:text-white text-[11px] font-medium transition-colors">
              Dismiss
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-[#52525B] uppercase tracking-wider mb-3">
            Project Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#9CA3AF] mb-1.5">Project Name</label>
              <input 
                type="text" 
                defaultValue="DeFi Swap Protocol" 
                className="w-full bg-[#0B1020] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-colors outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#9CA3AF] mb-1.5">Network</label>
              <div className="relative">
                <select className="w-full bg-[#0B1020] border border-[#27272A] rounded-lg pl-3 pr-8 py-2 text-xs text-white focus:border-purple-500 appearance-none cursor-pointer outline-none">
                  <option>Hyperion Mainnet</option>
                  <option>Mantle Testnet</option>
                  <option>Avalanche C-Chain</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#52525B] absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#D4D4D8]">Auto-Deployment</span>
              <div className="w-9 h-5 bg-[#7C3AED] rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#D4D4D8]">Debug Mode</span>
              <div className="w-9 h-5 bg-[#27272A] rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-[#52525B] rounded-full absolute left-1 top-1 shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1F1F22] pt-4">
          <h4 className="text-[11px] font-bold text-[#52525B] uppercase tracking-wider mb-3">
            Run History
          </h4>
          <div className="relative pl-4 border-l border-[#1F1F22] space-y-4">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#050814]" />
              <div className="text-xs text-white font-medium">Deployed to Prod</div>
              <div className="text-[10px] text-[#6B7280]">Just now by You</div>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#3B82F6] border-2 border-[#050814]" />
              <div className="text-xs text-white font-medium">Audit Completed</div>
              <div className="text-[10px] text-[#6B7280]">
                2 hours ago • <span className="text-emerald-400">98/100</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#6B7280] border-2 border-[#050814]" />
              <div className="text-xs text-[#9CA3AF]">Config Update</div>
              <div className="text-[10px] text-[#6B7280]">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};