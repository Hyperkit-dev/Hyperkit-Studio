import React from 'react';
import { Folder, Play, Pencil, FileText } from 'lucide-react';

export interface AgentCardProps {
  id: string;
  name: string;
  type: 'Generator' | 'Auditor' | 'Deployer';
  icon: React.ReactNode;
  iconColor: string;
  project: string;
  lastRun: string;
  isEnabled: boolean;
  isActive?: boolean;
  delay?: string;
  status?: 'active' | 'idle' | 'disabled';
}

export const AgentCard: React.FC<AgentCardProps> = ({
  id,
  name,
  type,
  icon,
  iconColor,
  project,
  lastRun,
  isEnabled,
  isActive = false,
  delay = 'delay-75',
  status = 'idle'
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'Generator':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Auditor':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Deployer':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  const getIconHoverColor = () => {
    switch (type) {
      case 'Generator':
        return 'hover:bg-purple-500/10 hover:text-purple-400';
      case 'Auditor':
        return 'hover:bg-blue-500/10 hover:text-blue-400';
      case 'Deployer':
        return 'hover:bg-pink-500/10 hover:text-pink-400';
      default:
        return 'hover:bg-purple-500/10 hover:text-purple-400';
    }
  };

  return (
    <div className={`animate-enter ${delay} group relative`}>
      {isActive && (
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/30 to-indigo-500/30 opacity-100 blur-[1px]" />
      )}
      
      <div className={`glass-panel relative rounded-xl bg-[#0B1020] p-4 flex items-center gap-4 transition-all ${!isActive && 'glass-panel-hover'}`}>
        <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4">
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-medium ${status === 'disabled' ? 'text-[#9CA3AF]' : 'text-white'} ${isActive && 'glow-text-purple'}`}>
                {name}
              </h3>
              {status === 'active' && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              )}
              {status === 'idle' && isEnabled && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#52525B]" />
              )}
            </div>
            <div className={`text-[10px] ${status === 'disabled' ? 'text-[#71717A]' : 'text-[#9CA3AF]'} flex items-center gap-1.5 mt-0.5`}>
              <span className={`px-1.5 py-px rounded border ${getTypeColor()}`}>
                {type}
              </span>
              <span>•</span>
              <span>ID: {id}</span>
            </div>
          </div>

          <div className="col-span-3">
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-medium mb-1">
              Project
            </div>
            <div className={`flex items-center gap-1.5 text-xs ${status === 'disabled' ? 'text-[#71717A]' : 'text-[#D4D4D8]'}`}>
              <Folder className="w-3 h-3 text-[#52525B]" />
              {project}
            </div>
          </div>

          <div className="col-span-3">
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-medium mb-1">
              Last Run
            </div>
            <div className={`text-xs ${status === 'disabled' ? 'text-[#71717A]' : 'text-[#D4D4D8]'}`}>
              {lastRun}
            </div>
          </div>

          <div className="col-span-2 flex justify-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#71717A] mr-1 group-hover:text-[#9CA3AF] transition-colors">
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <input 
                type="checkbox" 
                id={`toggle-${id}`} 
                className="hidden toggle-checkbox" 
                checked={isEnabled}
                readOnly
              />
              <label htmlFor={`toggle-${id}`} className="toggle-label" />
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-[#1F1F22] mx-2" />
        
        <div className="flex items-center gap-1">
          <button 
            className={`p-2 rounded-md text-[#9CA3AF] transition-colors ${
              status === 'disabled' 
                ? 'text-[#52525B] hover:text-[#9CA3AF] cursor-not-allowed' 
                : `${getIconHoverColor()} ${isActive && 'fill-current'}`
            }`}
            disabled={status === 'disabled'}
          >
            <Play className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};