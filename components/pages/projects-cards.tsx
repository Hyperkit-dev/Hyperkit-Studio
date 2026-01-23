import React from 'react';
import { MoreVertical } from 'lucide-react';

export interface NetworkBadge {
  name: string;
  color: string;
  dotColor: string;
}

export interface StatusBadge {
  name: string;
  color: string;
  dotColor: string;
}

export interface Collaborator {
  seed: string;
  name: string;
}

export interface ProjectCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  updatedAt: string;
  network: NetworkBadge;
  status: StatusBadge;
  collaborators: Collaborator[];
  additionalCount?: number;
  isActive?: boolean;
  delay?: string;
  isCreateCard?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  icon,
  iconColor,
  updatedAt,
  network,
  status,
  collaborators,
  additionalCount = 0,
  isActive = false,
  delay = 'delay-75',
  isCreateCard = false
}) => {
  if (isCreateCard) {
    return (
      <div className={`animate-enter ${delay} group cursor-pointer`}>
        <div className="h-full border border-dashed border-[#27272A] rounded-xl flex flex-col items-center justify-center p-6 hover:bg-[#101322] hover:border-[#3F3F46] transition-all">
          <div className="w-12 h-12 rounded-full bg-[#1F1F22] flex items-center justify-center mb-3 group-hover:bg-[#27272A] transition-colors">
            {icon}
          </div>
          <span className="text-sm font-medium text-[#71717A] group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-enter ${delay} relative group`}>
      {isActive && (
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/50 to-indigo-500/50 opacity-100 blur-[2px] pointer-events-none" />
      )}
      
      <div className={`glass-panel p-5 rounded-xl flex flex-col h-full relative z-10 bg-[#0B1020] transition-all ${!isActive && 'glass-panel-hover'}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{name}</h3>
              <div className="text-[10px] text-[#9CA3AF]">{updatedAt}</div>
            </div>
          </div>
          <button className="text-[#52525B] hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`${network.color} px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${network.dotColor}`} />
            {network.name}
          </span>
          <span className={`${status.color} px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
            {status.name}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1F1F22]">
          <div className="flex -space-x-2">
            {collaborators.map((collab, index) => (
              <img 
                key={index}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${collab.seed}`}
                className="w-6 h-6 rounded-full border-2 border-[#0B1020]" 
                alt={collab.name}
              />
            ))}
            {additionalCount > 0 && (
              <div className="w-6 h-6 rounded-full border-2 border-[#0B1020] bg-[#1F1F22] flex items-center justify-center text-[8px] text-[#A1A1AA]">
                +{additionalCount}
              </div>
            )}
          </div>
          <button className={`px-4 py-1.5 rounded-full text-xs font-medium text-white transition-all ${
            isActive 
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#6366F1] transform hover:scale-105 shadow-[0_2px_10px_rgba(124,58,237,0.3)]'
              : 'border border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46]'
          }`}>
            Open in Studio
          </button>
        </div>
      </div>
    </div>
  );
};