import React from 'react';
import { 
  X, 
  Settings2, 
  ExternalLink, 
  ArrowUp, 
  Copy, 
  Sparkles,
  FileCode,
  GitCommit
} from 'lucide-react';

export interface MetricData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface DeploymentInfo {
  contract: string;
  status: string;
  address: string;
  network: string;
  deployedAt: string;
}

export interface AISuggestion {
  id: string;
  severity: 'warning' | 'info';
  severityColor: string;
  title: string;
  description: string;
  hasActions?: boolean;
}

export interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

export interface ProjectDetailsPanelProps {
  projectName: string;
  projectIcon: React.ReactNode;
  iconColor: string;
  status: string;
  version: string;
  metrics: MetricData[];
  deployment: DeploymentInfo;
  aiSuggestions: AISuggestion[];
  activities: ActivityItem[];
}

export const ProjectDetailsPanel: React.FC<ProjectDetailsPanelProps> = ({
  projectName,
  projectIcon,
  iconColor,
  status,
  version,
  metrics,
  deployment,
  aiSuggestions,
  activities
}) => {
  return (
    <aside className="hidden xl:flex w-[400px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 animate-slide-right z-30">
      <div className="p-4 border-b border-[#1F1F22] flex items-center justify-between bg-[#0B1020]">
        <div className="flex items-center gap-3">
          <button className="text-[#9CA3AF] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-white">Project Summary</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 rounded hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <Settings2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
        {/* Project Identity */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-14 h-14 rounded-xl ${iconColor} flex items-center justify-center shrink-0`}>
            {projectIcon}
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">{projectName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-[#9CA3AF]">{status} • {version}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-3 rounded-lg border border-[#1F1F22] bg-[#0B1020]">
              <div className="text-[10px] text-[#71717A] mb-1">{metric.label}</div>
              <div className="text-sm font-semibold text-white">{metric.value}</div>
              <div className={`text-[9px] ${metric.isPositive ? 'text-emerald-400' : 'text-red-400'} flex items-center mt-1`}>
                <ArrowUp className="w-2.5 h-2.5" /> {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Current Deployment */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-[#9CA3AF] mb-3 uppercase tracking-wider">Deployment</h4>
          <div className="rounded-lg border border-[#1F1F22] bg-[#0B1020] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white">{deployment.contract}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {deployment.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#71717A] font-mono bg-[#020617] p-1.5 rounded border border-[#1F1F22] mb-2">
              <span className="truncate">{deployment.address}</span>
              <Copy className="w-3 h-3 hover:text-white cursor-pointer ml-auto" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#52525B]">
              <span>Deployed to {deployment.network}</span>
              <span>{deployment.deployedAt}</span>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <h4 className="text-xs font-semibold text-white">AI Suggestions</h4>
          </div>
          
          <div className="space-y-2">
            {aiSuggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                className="group relative rounded-lg border border-[#1F1F22] bg-[#0B1020] p-3 hover:border-purple-500/30 transition-colors cursor-pointer"
              >
                <div className={`absolute left-0 top-3 bottom-3 w-0.5 ${suggestion.severityColor} rounded-r-full`} />
                <div className="pl-2">
                  <div className="text-xs font-medium text-white mb-1">{suggestion.title}</div>
                  <p className="text-[10px] text-[#9CA3AF] leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>
                {suggestion.hasActions && (
                  <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-medium">
                      Fix with AI
                    </button>
                    <button className="px-2 py-1 rounded bg-[#1F1F22] hover:bg-[#27272A] text-[#9CA3AF] text-[10px]">
                      Ignore
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-xs font-semibold text-[#9CA3AF] mb-3 uppercase tracking-wider">Recent Activity</h4>
          <div className="space-y-3 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#1F1F22]" />
            
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 relative z-10">
                <div className={`w-8 h-8 rounded-full bg-[#101322] border border-[#1F1F22] flex items-center justify-center shrink-0 text-[10px] text-white`}>
                  {activity.icon}
                </div>
                <div className="pt-1">
                  <div className="text-xs text-[#E5E7EB]">{activity.title}</div>
                  <div className="text-[10px] text-[#71717A]">{activity.description}</div>
                </div>
                <div className="ml-auto text-[10px] text-[#52525B] pt-1">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};