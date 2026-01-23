import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HistoryCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  subtitle: string;
  projectName: string;
  projectIcon: string;
  actorName: string;
  actorAvatar?: string;
  status: 'success' | 'pending' | 'failed' | 'passed';
  time: string;
  isActive?: boolean;
}

export const HistoryCard = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  subtitle,
  projectName,
  projectIcon,
  actorName,
  actorAvatar,
  status,
  time,
  isActive = false
}: HistoryCardProps) => {
  const statusColors = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    passed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  return (
    <div className="group relative">
      {isActive && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#7C3AED] rounded-r-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
      )}
      <div className={`bg-[#0B1020] border ${isActive ? 'border-purple-500/30' : 'border-[#1F1F22]/20'} p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-[#101322] ${!isActive && 'hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]'} transition-all`}>
        <div className={`w-9 h-9 rounded-lg ${iconBgColor} flex items-center justify-center border ${iconColor.replace('text-', 'border-').replace('400', '20')} shrink-0`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4">
            <div className="text-xs font-medium text-white truncate">{title}</div>
            <div className="text-[10px] text-[#9CA3AF] truncate">{subtitle}</div>
          </div>
          
          <div className="col-span-3 flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${projectIcon} flex items-center justify-center text-[8px] font-bold`}>
              {projectName.charAt(0)}
            </div>
            <span className="text-xs text-[#D4D4D8] truncate">{projectName}</span>
          </div>

          <div className="col-span-3">
            <div className="flex items-center gap-1.5">
              {actorAvatar ? (
                <img src={actorAvatar} className="w-4 h-4 rounded-full bg-[#1F1F22]" alt="" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-[8px] text-purple-300">
                  AI
                </div>
              )}
              <span className="text-xs text-[#9CA3AF]">{actorName}</span>
            </div>
          </div>

          <div className="col-span-2 text-right">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <div className="text-[10px] text-[#52525B] mt-0.5">{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
