import React from 'react';
import { X, Share, Rocket, ShieldCheck, Layers, Check, Globe } from 'lucide-react';

export const TemplatePreviewPanel = () => {
  return (
    <aside className="hidden xl:flex w-[420px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 z-30">
      <div className="p-4 border-b border-[#1F1F22] flex items-center justify-between bg-[#0B1020]">
        <div className="flex items-center gap-3">
          <button className="text-[#9CA3AF] hover:text-white">
            <X className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-white">Template Preview</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 rounded hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <Share className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="h-48 w-full relative border-b border-[#1F1F22]" style={{
          backgroundImage: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.2), transparent 40%)'
        }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050814] to-transparent">
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-md">
                Popular
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">NFT Marketplace</h2>
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
            A comprehensive NFT marketplace solution inspired by OpenSea. Includes ERC-721 and ERC-1155 support, royalty enforcement standard, and a sleek frontend built with Next.js.
          </p>

          <div className="space-y-6">
            <button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] py-2.5 rounded-lg text-sm font-medium text-white transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4" />
              Launch with this template
            </button>

            <div className="h-px bg-[#1F1F22]" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">
                  Difficulty
                </div>
                <div className="text-xs text-white flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 bg-purple-500 rounded-sm" />
                    <div className="w-1 h-3 bg-purple-500 rounded-sm" />
                    <div className="w-1 h-3 bg-[#27272A] rounded-sm" />
                  </div>
                  Intermediate
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">
                  Audit Status
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Audited
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Included Features
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-xs text-[#D4D4D8]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Smart Contracts (Solidity)</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#D4D4D8]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Frontend (React/Next.js)</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#D4D4D8]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Subgraph Indexing</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#D4D4D8]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>IPFS Upload Integration</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Compatible Chains
              </h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-2.5 py-1.5 rounded-md bg-[#101322] border border-[#1F1F22] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-xs text-[#D4D4D8]">Ethereum</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-md bg-[#101322] border border-[#1F1F22] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span className="text-xs text-[#D4D4D8]">Polygon</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-md bg-[#101322] border border-[#1F1F22] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-[#D4D4D8]">Arbitrum</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-md bg-[#101322] border border-[#1F1F22] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-xs text-[#D4D4D8]">Optimism</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};