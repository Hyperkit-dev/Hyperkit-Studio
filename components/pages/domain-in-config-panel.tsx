import React from 'react';
import { X, ExternalLink, Copy, Loader, RefreshCw, Trash2 } from 'lucide-react';

export const DomainConfigPanel = () => {
  return (
    <aside className="hidden xl:flex w-[420px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 z-30 shadow-2xl">
      <div className="h-16 px-6 border-b border-[#1F1F22] bg-[#0B1020] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Domain Configuration</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-[11px] text-[#A1A1AA]">Verification Pending</p>
          </div>
        </div>
        <button className="p-1.5 text-[#71717A] hover:text-white rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1F1F22] border-dashed">
          <div className="w-10 h-10 rounded-xl bg-[#1F1F22] border border-[#27272A] flex items-center justify-center shrink-0 text-white">
            <span className="font-bold text-lg">S</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">platform.startuplab.io</div>
            <a 
              href="https://platform.startuplab.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-0.5"
            >
              Visit Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-[#1F1F22] border border-[#27272A] flex items-center justify-center text-[10px] font-bold text-white">
              1
            </div>
            <h3 className="text-xs font-medium text-white">Configure DNS Records</h3>
          </div>
          
          <p className="text-[11px] text-[#71717A] mb-3 ml-7">
            Log in to your DNS provider (e.g., GoDaddy, Namecheap) and add the following record.
          </p>

          <div className="ml-7 space-y-3">
            <div className="bg-[#020617] border border-[#1F1F22] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[#0B1020] border-b border-[#1F1F22]">
                <span className="text-[10px] font-semibold text-[#71717A] uppercase">Type</span>
                <span className="text-[10px] font-mono text-purple-400">CNAME</span>
              </div>
              <div className="p-3 space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] text-[#71717A] mb-1">Name</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-[#1F1F22] border border-[#27272A] rounded px-2 py-1.5 text-xs text-white font-mono">
                      platform
                    </code>
                    <button className="p-1.5 text-[#71717A] hover:text-white bg-[#1F1F22] hover:bg-[#27272A] border border-[#27272A] rounded transition-all">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-[#71717A] mb-1">Value</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-[#1F1F22] border border-[#27272A] rounded px-2 py-1.5 text-xs text-white font-mono">
                      cname.hyperkit.ai
                    </code>
                    <button className="p-1.5 text-[#71717A] hover:text-white bg-[#1F1F22] hover:bg-[#27272A] border border-[#27272A] rounded transition-all">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-[#1F1F22] border border-[#27272A] flex items-center justify-center text-[10px] font-bold text-white">
              2
            </div>
            <h3 className="text-xs font-medium text-white">Verify Connection</h3>
          </div>
          
          <div className="ml-7">
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3 mb-3">
              <div className="flex items-start gap-2">
                <Loader className="w-3.5 h-3.5 text-amber-500 mt-0.5 animate-spin" />
                <div>
                  <p className="text-xs text-amber-200">Waiting for DNS propagation</p>
                  <p className="text-[10px] text-amber-500/70 mt-0.5">
                    This can take up to 24 hours, but usually happens in minutes.
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-[#1F1F22] hover:bg-[#27272A] text-white border border-[#27272A] rounded-md text-xs font-medium transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Status
            </button>
          </div>
        </div>

        <div className="mt-auto border-t border-[#1F1F22] pt-6">
          <h3 className="text-xs font-medium text-white mb-3">Danger Zone</h3>
          <div className="rounded-lg border border-red-900/20 bg-red-900/5 p-4">
            <p className="text-[11px] text-[#A1A1AA] mb-3">
              Removing this domain will make the associated project inaccessible via this URL.
            </p>
            <button className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-2 hover:underline">
              <Trash2 className="w-3.5 h-3.5" />
              Remove Domain
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};