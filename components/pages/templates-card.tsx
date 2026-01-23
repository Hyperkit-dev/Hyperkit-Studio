import React from 'react';

export interface TemplateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  networks: Array<{ color: string; name: string }>;
  badge?: { text: string; color: string };
  isActive?: boolean;
  delay?: string;
  thumbPattern?: string;
}

export const TemplateCard = ({
  title,
  description,
  icon,
  tags,
  networks,
  badge,
  isActive = false,
  delay = 'delay-75',
  thumbPattern = 'thumb-pattern-1'
}: TemplateCardProps) => {
  return (
    <div className={`animate-enter ${delay} group relative cursor-pointer`}>
      {isActive && (
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/50 to-indigo-500/50 opacity-100 blur-[2px] transition-opacity" />
      )}
      
      <div className={`bg-[#0B1020] border ${isActive ? 'border-[#1F1F22]/20' : 'border-[#1F1F22]/20'} rounded-xl flex flex-col h-full relative z-10 overflow-hidden ${!isActive && 'hover:bg-[#101322] hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.05)] hover:translate-y-[-1px]'} transition-all duration-300`}>
        <div className={`h-32 w-full bg-[#101322] relative border-b border-[#1F1F22] overflow-hidden ${thumbPattern} group-hover:scale-[1.02] transition-transform duration-500`}>
          {badge && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${badge.color} backdrop-blur-sm`}>
                {badge.text}
              </span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-[#18181B]/50 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-xl">
              {icon}
            </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-[11px] text-[#9CA3AF] mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#18181B] text-[#D4D4D8] border border-[#27272A]">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#1F1F22]">
            <div className="flex items-center gap-2">
              {networks.slice(0, 2).map((network, i) => (
                <div 
                  key={i}
                  className={`w-4 h-4 rounded-full ${network.color} flex items-center justify-center`}
                  title={network.name}
                >
                  <div className={`w-2 h-2 rounded-full ${network.color.replace('/50', '')}`} />
                </div>
              ))}
              {networks.length > 2 && (
                <span className="text-[10px] text-[#52525B]">+{networks.length - 2}</span>
              )}
            </div>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all transform ${
              isActive 
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:scale-105 shadow-lg' 
                : 'border border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46] bg-[#0B1020]'
            }`}>
              Use template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};