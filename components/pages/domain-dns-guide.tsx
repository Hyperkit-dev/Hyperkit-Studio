"use client";

import React from 'react';
import { Info, X } from 'lucide-react';

export const DNSGuide = () => {
  return (
    <div className="mb-6 rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-900/10 to-transparent p-4 flex items-start justify-between">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
          <Info className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xs font-medium text-white mb-1">Configuring DNS Records</h3>
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed max-w-2xl">
            To connect a custom domain, you need to add a <span className="font-mono text-purple-300">CNAME</span> record pointing to{' '}
            <span className="font-mono text-white bg-[#1F1F22] px-1 rounded">cname.hyperkit.ai</span>. For apex domains, use an{' '}
            <span className="font-mono text-purple-300">A</span> record pointing to{' '}
            <span className="font-mono text-white bg-[#1F1F22] px-1 rounded">76.76.21.21</span>.
          </p>
        </div>
      </div>
      <button className="text-[#71717A] hover:text-white transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};