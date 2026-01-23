import React from 'react';
import { X, Share, MoreHorizontal, FileCode, Info } from 'lucide-react';

export const HistoryDetailPanel = () => {
  return (
    <aside className="hidden xl:flex w-[400px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 z-30">
      <div className="p-4 border-b border-[#1F1F22] flex items-center justify-between bg-[#0B1020]">
        <div className="flex items-center gap-3">
          <button className="text-[#9CA3AF] hover:text-white">
            <X className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-white">Transaction Details</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 rounded hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <Share className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
            <FileCode className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-base font-semibold text-white">Smart Contract Generation</h2>
          <div className="text-xs text-[#9CA3AF] mt-1">Today at 10:42 AM</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-lg border border-[#1F1F22] bg-[#0B1020]">
            <div className="text-[10px] text-[#71717A] mb-1">Duration</div>
            <div className="text-xs font-medium text-white">4.2s</div>
          </div>
          <div className="p-3 rounded-lg border border-[#1F1F22] bg-[#0B1020]">
            <div className="text-[10px] text-[#71717A] mb-1">Cost</div>
            <div className="text-xs font-medium text-white">0.02 ETH</div>
          </div>
          <div className="p-3 rounded-lg border border-[#1F1F22] bg-[#0B1020]">
            <div className="text-[10px] text-[#71717A] mb-1">Network</div>
            <div className="text-xs font-medium text-white">Hyperion Mainnet</div>
          </div>
          <div className="p-3 rounded-lg border border-[#1F1F22] bg-[#0B1020]">
            <div className="text-[10px] text-[#71717A] mb-1">Model</div>
            <div className="text-xs font-medium text-white">GPT-4 Turbo</div>
          </div>
        </div>

        <div className="border-b border-[#1F1F22] mb-4">
          <div className="flex gap-4">
            <button className="pb-2 text-xs font-medium text-purple-400 border-b-2 border-purple-500">
              Diff View
            </button>
            <button className="pb-2 text-xs font-medium text-[#71717A] hover:text-white transition-colors">
              Raw Logs
            </button>
            <button className="pb-2 text-xs font-medium text-[#71717A] hover:text-white transition-colors">
              Metadata
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-[#52525B] mb-1">
            <span>contracts/Token.sol</span>
            <span className="text-purple-400 font-mono">2 additions, 1 removal</span>
          </div>
          
          <div className="bg-[#020617] rounded-lg border border-[#1F1F22] p-3 font-mono text-[10px] overflow-x-auto">
            <div className="text-[#6B7280] mb-1">// ... existing code ...</div>
            <div className="text-[#D4D4D8] mb-1">    string public name = "HyperToken";</div>
            <div className="bg-red-500/10 border-l-2 border-red-500 text-[#F87171] mb-1 px-1 -mx-1 opacity-70">
              -   uint256 public initialSupply = 1000000;
            </div>
            <div className="bg-emerald-500/10 border-l-2 border-emerald-500 text-[#34D399] mb-1 px-1 -mx-1">
              +   uint256 public initialSupply = 5000000;
            </div>
            <div className="bg-emerald-500/10 border-l-2 border-emerald-500 text-[#34D399] mb-1 px-1 -mx-1">
              +   bool public isMintable = true;
            </div>
            <div className="text-[#D4D4D8] mb-1">    </div>
            <div className="text-[#D4D4D8] mb-1">    constructor() {'{'}</div>
            <div className="text-[#6B7280]">// ... existing code ...</div>
          </div>

          <div className="bg-[#101322] rounded-lg p-3 border border-purple-500/10 mt-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-purple-400 mt-0.5" />
              <div>
                <h4 className="text-xs font-medium text-white mb-1">Audit Recommendation</h4>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                  The increase in supply was successfully implemented. Consider adding a cap to{' '}
                  <code className="bg-[#1F1F22] px-1 rounded text-purple-300">mint()</code> function to prevent inflation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button className="flex-1 py-2 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-medium transition-colors">
            Revert
          </button>
          <button className="flex-1 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium transition-colors shadow-lg shadow-purple-900/40">
            View Code
          </button>
        </div>
      </div>
    </aside>
  );
};
