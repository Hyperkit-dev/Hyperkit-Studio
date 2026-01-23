import React from 'react';
import { FileText, Copy, Share2, X, Sparkles, ArrowRight } from 'lucide-react';

export interface LogDetails {
  timestamp: string;
  eventId: string;
  service: string;
  host: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  severityColor: string;
  message: string;
  stackTrace: string;
  payload: string;
}

export interface LogDetailsPanelProps {
  logDetails: LogDetails;
  onClose?: () => void;
}

export const LogDetailsPanel: React.FC<LogDetailsPanelProps> = ({
  logDetails,
  onClose
}) => {
  return (
    <aside className="hidden xl:flex w-[450px] bg-[#050814] border-l border-[#1F1F22] flex-col shrink-0 animate-slide-right z-30 shadow-2xl">
      <div className="h-14 px-5 border-b border-[#1F1F22] bg-[#0B1020] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#9CA3AF]" />
          <h2 className="text-sm font-semibold text-white">Log Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="p-1.5 text-[#71717A] hover:text-white rounded transition-colors" 
            title="Copy Raw JSON"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            className="p-1.5 text-[#71717A] hover:text-white rounded transition-colors" 
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            className="p-1.5 text-[#71717A] hover:text-white rounded transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-5">
        {/* HyperAgent CTA */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-xl p-4 mb-6 relative group cursor-pointer hover:border-purple-500/40 transition-all">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/40">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Analyze with HyperAgent</h3>
              <p className="text-xs text-[#A1A1AA]">Get root cause analysis and fix suggestions for this error.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-400 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">
              Timestamp
            </div>
            <div className="text-xs text-[#D4D4D8] font-mono">{logDetails.timestamp}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">
              Event ID
            </div>
            <div className="text-xs text-[#D4D4D8] font-mono">{logDetails.eventId}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">
              Service
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <div className="text-xs text-[#D4D4D8]">{logDetails.service}</div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">
              Host
            </div>
            <div className="text-xs text-[#D4D4D8] font-mono">{logDetails.host}</div>
          </div>
        </div>

        {/* Stack Trace */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">
              Message &amp; Stack Trace
            </div>
            <span className={`text-[10px] ${logDetails.severityColor} px-1.5 py-0.5 rounded border`}>
              {logDetails.severity}
            </span>
          </div>
          <div className="bg-[#020617] border border-[#1F1F22] rounded-lg p-3 overflow-x-auto">
            <pre className="font-mono text-[11px] leading-relaxed text-[#D4D4D8]">
              <span className="text-rose-400">{logDetails.message}</span>
              {'\n'}{logDetails.stackTrace}
            </pre>
          </div>
        </div>

        {/* Context Data */}
        <div>
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-2">
            Payload
          </div>
          <div className="bg-[#020617] border border-[#1F1F22] rounded-lg p-3 overflow-x-auto group relative">
            <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1F1F22] p-1 rounded border border-[#27272A] text-[#9CA3AF] hover:text-white">
              <Copy className="w-3 h-3" />
            </button>
            <pre className="font-mono text-[11px] leading-relaxed text-[#9CA3AF]">
              {logDetails.payload}
            </pre>
          </div>
        </div>
      </div>
    </aside>
  );
};