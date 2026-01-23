import React from 'react';
import { 
  MoreHorizontal, 
  Maximize2, 
  Globe, 
  Database,
  Save
} from 'lucide-react';

export interface ExecutionHistory {
  id: string;
  title: string;
  time: string;
  status: 'success' | 'failed';
  duration?: string;
  error?: string;
}

export interface AgentConfigPanelProps {
  agentName: string;
  agentIcon: React.ReactNode;
  iconColor: string;
  systemPrompt: string;
  version: string;
  model: string;
  safetyLevel: string;
  executionHistory: ExecutionHistory[];
}

export const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  agentName,
  agentIcon,
  iconColor,
  systemPrompt,
  version,
  model,
  safetyLevel,
  executionHistory
}) => {
  return (
    <aside className="hidden xl:flex w-[400px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 animate-slide-right z-30">
      <div className="p-4 border-b border-[#1F1F22] flex items-center justify-between bg-[#0B1020]">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center`}>
            {agentIcon}
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{agentName}</div>
            <div className="text-[10px] text-[#71717A]">Configuration &amp; History</div>
          </div>
        </div>
        <button className="p-1.5 rounded hover:bg-[#1F1F22] text-[#9CA3AF] hover:text-white transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-5 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-medium text-[#D4D4D8]">System Prompt</label>
            <span className="text-[10px] text-[#71717A]">{version}</span>
          </div>
          <div className="relative group">
            <textarea 
              className="w-full h-32 bg-[#0B1020] border border-[#27272A] rounded-lg p-3 text-[11px] font-mono text-[#9CA3AF] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none leading-relaxed outline-none" 
              spellCheck={false}
              defaultValue={systemPrompt}
            />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 bg-[#1F1F22] border border-[#27272A] rounded hover:text-white text-[#71717A]">
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[#D4D4D8] mb-2 block">Active Tools</label>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#101322] border border-[#7C3AED]/30 text-xs text-white shadow-[0_0_10px_rgba(124,58,237,0.1)]">
              <Globe className="w-3 h-3 text-purple-400" />
              Internet Access
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#101322] border border-[#7C3AED]/30 text-xs text-white shadow-[0_0_10px_rgba(124,58,237,0.1)]">
              <Database className="w-3 h-3 text-purple-400" />
              Vector Memory
            </div>
            <button className="px-2.5 py-1.5 rounded-md bg-[#18181B] border border-dashed border-[#52525B] text-xs text-[#71717A] hover:text-[#D4D4D8] hover:border-[#71717A] transition-colors">
              + Add tool
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold">Model</label>
            <select className="w-full bg-[#0B1020] border border-[#27272A] rounded-md py-1.5 px-2 text-xs text-white focus:outline-none focus:border-purple-500/50">
              <option>{model}</option>
              <option>Claude 3 Opus</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold">Safety Level</label>
            <div className="flex items-center gap-2 bg-[#0B1020] border border-[#27272A] rounded-md py-1.5 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-white">{safetyLevel}</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#1F1F22]" />

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-medium text-[#D4D4D8]">Recent Executions</label>
            <button className="text-[10px] text-purple-400 hover:text-purple-300">View logs</button>
          </div>
          
          <div className="space-y-3 relative">
            <div className="absolute top-2 bottom-2 left-1.5 w-px bg-[#1F1F22]" />

            {executionHistory.map((execution, index) => (
              <div key={execution.id} className="relative pl-5">
                <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#0B1020] border ${
                  execution.status === 'success' ? 'border-emerald-500/50' : 'border-red-500/50'
                } flex items-center justify-center`}>
                  <div className={`w-1 h-1 rounded-full ${
                    execution.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                  }`} />
                </div>
                <div className={`${
                  index === 0 ? 'bg-[#101322]' : 'bg-[#0B1020]'
                } border border-[#1F1F22] rounded-md p-2.5 hover:border-[#27272A] transition-colors cursor-pointer ${
                  execution.status === 'failed' && 'opacity-75'
                }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-medium ${
                      index === 0 ? 'text-white' : 'text-[#D4D4D8]'
                    }`}>
                      {execution.title}
                    </span>
                    <span className="text-[10px] text-[#71717A]">{execution.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${
                      execution.status === 'success' 
                        ? 'text-emerald-400 bg-emerald-400/10' 
                        : 'text-red-400 bg-red-400/10'
                    } px-1.5 rounded`}>
                      {execution.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                    <span className="text-[10px] text-[#52525B]">
                      {execution.duration || execution.error}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-[#1F1F22] bg-[#050814]">
        <button className="w-full bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] text-white py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </button>
      </div>
    </aside>
  );
};