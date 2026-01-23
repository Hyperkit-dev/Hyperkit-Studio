"use client";

import React from 'react';
import { BrainCircuit, ShieldCheck, Rocket, PenTool } from 'lucide-react';
import { AgentsSidebar } from '@/components/pages/agents-sidebar';
import { AgentsToolbar } from '@/components/pages/agents-toolbar';
import { AgentCard, AgentCardProps } from '@/components/pages/agents-card';
import { AgentConfigPanel, AgentConfigPanelProps } from '@/components/pages/agents-config-panel';

export default function HyperkitAgents() {
  const agents: AgentCardProps[] = [
    {
      id: 'agt_8x92...',
      name: 'Solidity Architect',
      type: 'Generator',
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      iconColor: 'bg-purple-500/10 border border-purple-500/20',
      project: 'DeFi Vault V2',
      lastRun: '2 mins ago',
      isEnabled: true,
      isActive: true,
      delay: 'delay-75',
      status: 'active'
    },
    {
      id: 'agt_3k11...',
      name: 'Security Sentinel',
      type: 'Auditor',
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      iconColor: 'bg-blue-500/10 border border-blue-500/20',
      project: 'Global',
      lastRun: '4 hrs ago',
      isEnabled: true,
      delay: 'delay-100',
      status: 'idle'
    },
    {
      id: 'agt_9m44...',
      name: 'Mainnet Deployer',
      type: 'Deployer',
      icon: <Rocket className="w-5 h-5 text-orange-400" />,
      iconColor: 'bg-orange-500/10 border border-orange-500/20',
      project: 'NFT Market',
      lastRun: '2 days ago',
      isEnabled: false,
      delay: 'delay-150',
      status: 'disabled'
    },
    {
      id: 'agt_2p99...',
      name: 'Frontend Builder',
      type: 'Generator',
      icon: <PenTool className="w-5 h-5 text-pink-400" />,
      iconColor: 'bg-pink-500/10 border border-pink-500/20',
      project: 'Dashboard V1',
      lastRun: '5 days ago',
      isEnabled: true,
      delay: 'delay-200',
      status: 'idle'
    }
  ];

  const configPanelData: AgentConfigPanelProps = {
    agentName: 'Solidity Architect',
    agentIcon: <BrainCircuit className="w-4 h-4 text-purple-400" />,
    iconColor: 'bg-purple-500/10 border border-purple-500/20',
    systemPrompt: `You are an expert Solidity developer. 
Your goal is to write secure, gas-efficient smart contracts based on user specifications.
Always implement OpenZeppelin standards where applicable.`,
    version: 'v4.2',
    model: 'GPT-4 Turbo',
    safetyLevel: 'Strict',
    executionHistory: [
      {
        id: '1',
        title: 'Generate ERC20 Contract',
        time: '2m ago',
        status: 'success',
        duration: '1.4s duration'
      },
      {
        id: '2',
        title: 'Refactor Vault Logic',
        time: '5h ago',
        status: 'success',
        duration: '3.2s duration'
      },
      {
        id: '3',
        title: 'Deploy to Goerli',
        time: '1d ago',
        status: 'failed',
        error: 'RPC Error'
      }
    ]
  };

  return (
    <div className="bg-[#020617] text-[#F9FAFB] w-full h-screen flex flex-col overflow-hidden text-sm antialiased">
      <style>{`
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
        
        .delay-75 { animation-delay: 0.075s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
        
        .glass-panel {
          background-color: #0B1020;
          border: 1px solid rgba(148, 163, 255, 0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .glass-panel-hover:hover {
          background-color: #101322;
          border-color: rgba(124, 58, 237, 0.3);
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.05);
          transform: translateY(-1px);
        }
        
        /* Toggle Switch */
        .toggle-checkbox:checked {
          right: 0;
          border-color: #7C3AED;
        }
        
        .toggle-checkbox:checked + .toggle-label {
          background-color: #7C3AED;
        }
        
        .toggle-checkbox:checked + .toggle-label:before {
          transform: translateX(100%);
        }
        
        .toggle-label {
          width: 32px;
          height: 18px;
          background-color: #27272A;
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
        
        .toggle-label:before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s ease-in-out;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        
        .glow-text-purple { 
          text-shadow: 0 0 10px rgba(167, 139, 250, 0.5); 
        }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <AgentsSidebar />

        <main className="flex-1 overflow-y-auto bg-[#020617] relative scroll-smooth p-6 hide-scrollbar">
          <div className="max-w-5xl mx-auto flex flex-col h-full">
            <div className="animate-enter">
              <AgentsToolbar />
            </div>

            <div className="flex flex-col gap-3 pb-10">
              {agents.map((agent, index) => (
                <AgentCard key={agent.id} {...agent} />
              ))}
            </div>
          </div>
        </main>

        <AgentConfigPanel {...configPanelData} />
      </div>
    </div>
  );
}