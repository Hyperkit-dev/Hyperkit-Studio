import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Search, 
  ArrowRight 
} from 'lucide-react';

export interface InsightData {
  id: string;
  type: 'positive' | 'warning' | 'actionable';
  icon: React.ReactNode;
  iconColor: string;
  borderColor: string;
  title: string;
  description: string;
  tags?: string[];
  hasActions?: boolean;
  backgroundColor?: string;
}

export interface AIInsightsPanelProps {
  insights: InsightData[];
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights }) => {
  return (
    <aside className="hidden xl:flex w-[350px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 animate-slide-right z-30">
      <div className="p-4 border-b border-[#1F1F22] bg-[#0B1020]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-white">AI Insights</h2>
        </div>
        <p className="text-[10px] text-[#71717A]">Real-time analysis of project metrics</p>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-5 space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className={`${insight.backgroundColor || 'bg-[#101322]'} border ${insight.borderColor} rounded-xl p-4 relative overflow-hidden group`}
          >
            {insight.type === 'positive' && (
              <div className={`absolute top-0 left-0 w-1 h-full ${insight.borderColor.replace('border-', 'bg-')}`} />
            )}
            {insight.type === 'actionable' && (
              <div className="absolute top-0 right-0 p-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
              </div>
            )}
            
            <div className="flex items-start gap-3 mb-2">
              <div className={insight.iconColor}>
                {insight.icon}
              </div>
              <h3 className="text-xs font-semibold text-[#D4D4D8]">{insight.title}</h3>
            </div>
            <p className="text-[11px] text-[#A1A1AA] leading-relaxed mb-3">
              {insight.description}
            </p>
            
            {insight.tags && (
              <div className="flex gap-2">
                {insight.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {insight.hasActions && insight.type === 'warning' && (
              <button className="w-full text-[10px] bg-[#1F1F22] hover:bg-[#27272A] border border-[#27272A] text-white py-1.5 rounded transition-colors flex items-center justify-center gap-2">
                <Search className="w-3 h-3" /> Investigate Transaction
              </button>
            )}

            {insight.hasActions && insight.type === 'actionable' && (
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-medium py-1.5 rounded transition-colors shadow-lg shadow-purple-900/20">
                  Apply Config
                </button>
                <button className="flex-1 bg-[#1F1F22] hover:bg-[#27272A] border border-[#27272A] text-[#9CA3AF] text-[10px] font-medium py-1.5 rounded transition-colors">
                  Dismiss
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Chat Input */}
      <div className="p-4 border-t border-[#1F1F22] bg-[#050814]">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask AI about your metrics..." 
            className="w-full bg-[#101322] border border-[#27272A] rounded-lg py-2 pl-3 pr-8 text-xs text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-[#52525B] outline-none"
          />
          <button className="absolute right-2 top-2 text-[#52525B] hover:text-white transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};