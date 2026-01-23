"use client";

import React from 'react';
import { Globe, Loader2, AlertCircle, LucideIcon } from 'lucide-react';

interface DomainRowProps {
  domain: string;
  description: string;
  projectName: string;
  projectColor: string;
  environment: string;
  status: 'connected' | 'pending' | 'error';
  statusText: string;
  lastUpdated: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  isSelected?: boolean;
}

export const DomainRow = ({
  domain,
  description,
  projectName,
  projectColor,
  environment,
  status,
  statusText,
  lastUpdated,
  icon: Icon,
  iconBgColor = 'bg-[#1F1F22]',
  iconColor = 'text-[#D4D4D8]',
  isSelected = false
}: DomainRowProps) => {
  const statusColors = {
    connected: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const statusDotColors = {
    connected: 'bg-purple-400',
    pending: 'bg-amber-400',
    error: 'bg-rose-400'
  };

  const DisplayIcon = Icon || Globe;

  return (
    <div className={`grid grid-cols-12 gap-4 px-4 py-3 items-center ${isSelected ? 'bg-[#101322] border-l-2 border-l-[#7C3AED]' : 'hover:bg-[#101322]'} transition-colors group cursor-pointer`}>
      <div className="col-span-4 flex items-center gap-3">
        <input
        type="checkbox"
        className="appearance-none w-3.5 h-3.5 border border-[#27272A] rounded bg-[#050814] checked:bg-[#7C3AED] checked:border-[#7C3AED] transition-all cursor-pointer"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '12px 12px',
        }}
        />
        <div className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center shrink-0 ${iconColor} ${iconBgColor.includes('border') ? '' : 'border border-transparent'}`}>
          <DisplayIcon className={`w-4 h-4 ${Icon === Loader2 ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <div className="text-sm font-medium text-white">{domain}</div>
          <div className="text-[11px] text-[#71717A]">{description}</div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded ${projectColor}`} />
          <span className="text-xs text-[#D4D4D8]">{projectName}</span>
        </div>
      </div>
      <div className="col-span-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#1F1F22] text-[#D4D4D8] border border-[#27272A]">
          {environment}
        </span>
      </div>
      <div className="col-span-2">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium border ${statusColors[status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDotColors[status]} ${status === 'pending' ? 'animate-pulse' : ''}`} />
          {statusText}
        </span>
      </div>
      <div className="col-span-1 text-right text-[11px] text-[#71717A] font-mono">{lastUpdated}</div>
    </div>
  );
};