"use client";

import React, { useState } from 'react';
import { LogsToolbar } from '@/components/pages/logs-toolbar';
import { LogEntry, LogEntryProps } from '@/components/pages/log-entry';
import { LogDetailsPanel, LogDetails } from '@/components/pages/log-details-panel';

export default function HyperkitLogs() {
  const [selectedLogId, setSelectedLogId] = useState<string>('1');

  const logs: (LogEntryProps & { id: string })[] = [
    {
      id: '1',
      timestamp: 'Oct 24 14:02:12.441',
      level: 'ERROR',
      source: 'api-service-prod',
      message: 'ConnectionTimeout: Database connection pool exhausted after 3000ms',
      network: 'us-east-1',
      networkIcon: 'globe',
      isSelected: true
    },
    {
      id: '2',
      timestamp: 'Oct 24 14:02:11.890',
      level: 'WARN',
      source: 'defi-vault-contract',
      message: 'High gas price detected: 145 gwei (Threshold: 120)',
      network: 'Mainnet',
      networkIcon: 'ethereum'
    },
    {
      id: '3',
      timestamp: 'Oct 24 14:02:10.203',
      level: 'INFO',
      source: 'auth-service',
      message: 'User session verified successfully for uid: 899212',
      network: 'us-west-2',
      networkIcon: 'globe'
    },
    {
      id: '4',
      timestamp: 'Oct 24 14:02:09.112',
      level: 'INFO',
      source: 'indexer-node-03',
      message: 'Block #18429901 processed (142 txs)',
      network: 'Mainnet',
      networkIcon: 'ethereum'
    },
    {
      id: '5',
      timestamp: 'Oct 24 14:01:55.400',
      level: 'ERROR',
      source: 'payment-processor',
      message: 'Webhook delivery failed: 502 Bad Gateway',
      network: 'eu-central',
      networkIcon: 'globe'
    }
  ];

  const logDetails: LogDetails = {
    timestamp: 'Oct 24 14:02:12.441',
    eventId: 'evt_829910aa',
    service: 'api-service-prod',
    host: 'ip-10-0-12-88',
    severity: 'Critical',
    severityColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    message: 'ConnectionTimeout: Database connection pool exhausted after 3000ms',
    stackTrace: `    at Pool.connect (/app/node_modules/pg-pool/index.js:8:11)
    at Object.query (/app/db/index.js:14:22)
    at UserService.getUser (/app/services/user.js:45:18)
    at async verifyUser (/app/controllers/auth.js:22:9)`,
    payload: `{
  "request_id": "req_992120",
  "user_id": 8912,
  "region": "us-east-1",
  "retry_count": 3,
  "headers": {
    "content-type": "application/json",
    "user-agent": "Mozilla/5.0..."
  }
}`
  };

  return (
    <div className="bg-[#020617] text-[#F9FAFB] w-full h-screen flex flex-col overflow-hidden text-sm antialiased">
      <style>{`
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(32px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-enter { 
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
          opacity: 0;
        }
        
        .animate-slide-right { 
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        
        .glass-panel {
          background-color: #0B1020;
          border: 1px solid rgba(148, 163, 255, 0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .log-row-selected {
          background-color: rgba(124, 58, 237, 0.05);
          border-left: 2px solid #7C3AED;
        }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] bg-teal-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <main className="flex-1 overflow-hidden bg-[#020617] relative flex flex-col">
          <LogsToolbar />

          {/* Log List Header */}
          <div className="flex items-center px-4 py-2 border-b border-[#1F1F22] bg-[#0B1020] text-[10px] font-medium text-[#71717A] uppercase tracking-wider shrink-0">
            <div className="w-36">Timestamp</div>
            <div className="w-20">Level</div>
            <div className="w-40">Source</div>
            <div className="flex-1">Message</div>
            <div className="w-32 text-right pr-4">Network</div>
          </div>

          {/* Logs Container */}
          <div className="flex-1 overflow-y-auto font-mono text-xs relative hide-scrollbar">
            {logs.map((log) => (
              <LogEntry
                key={log.id}
                {...log}
                isSelected={log.id === selectedLogId}
                onClick={() => setSelectedLogId(log.id)}
              />
            ))}
          </div>
          
          {/* Bottom Status Bar */}
          <div className="h-8 bg-[#0B1020] border-t border-[#1F1F22] flex items-center justify-between px-4 text-[10px] text-[#71717A] shrink-0">
            <div className="flex items-center gap-3">
              <span>Showing 5 of 1,240 events</span>
              <span className="w-px h-3 bg-[#27272A]" />
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ingesting live data...
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Latency: 42ms</span>
            </div>
          </div>
        </main>

        <LogDetailsPanel logDetails={logDetails} />
      </div>
    </div>
  );
}