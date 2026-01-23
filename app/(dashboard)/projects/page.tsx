"use client";

import React from 'react';
import { 
  ArrowRightLeft, 
  Image, 
  Landmark, 
  Coins, 
  Plus,
  FileCode,
  GitCommit
} from 'lucide-react';
import { ProjectsToolbar } from '@/components/pages/projects-toolbar';
import { ProjectCard, ProjectCardProps } from '@/components/pages/projects-cards';
import { ProjectDetailsPanel, ProjectDetailsPanelProps } from '@/components/pages/projects-details-panel';

export default function HyperkitProjects() {
  const projects: ProjectCardProps[] = [
    {
      id: '1',
      name: 'DeFi Swap Protocol',
      icon: <ArrowRightLeft className="w-5 h-5 text-indigo-400" />,
      iconColor: 'bg-indigo-500/10 border border-indigo-500/20',
      updatedAt: 'Updated 2m ago',
      network: {
        name: 'Hyperion',
        color: 'bg-purple-500/10 text-[#A78BFA] border border-purple-500/20',
        dotColor: 'bg-[#A78BFA]'
      },
      status: {
        name: 'Mainnet',
        color: 'bg-[#022c22] text-[#4ade80] border border-[#059669]/30',
        dotColor: 'bg-[#4ade80]'
      },
      collaborators: [
        { seed: 'Felix', name: 'Felix' }
      ],
      additionalCount: 2,
      isActive: true,
      delay: 'delay-75'
    },
    {
      id: '2',
      name: 'Cosmic NFT Drop',
      icon: <Image className="w-5 h-5 text-pink-400" />,
      iconColor: 'bg-pink-500/10 border border-pink-500/20',
      updatedAt: 'Updated 4h ago',
      network: {
        name: 'Mantle',
        color: 'bg-teal-500/10 text-[#2DD4BF] border border-teal-500/20',
        dotColor: 'bg-[#2DD4BF]'
      },
      status: {
        name: 'Testnet',
        color: 'bg-[#1c1917] text-[#fbbf24] border border-[#fbbf24]/20',
        dotColor: 'bg-[#fbbf24]'
      },
      collaborators: [
        { seed: 'Aneka', name: 'Aneka' }
      ],
      delay: 'delay-100'
    },
    {
      id: '3',
      name: 'DAO Governance',
      icon: <Landmark className="w-5 h-5 text-red-400" />,
      iconColor: 'bg-red-500/10 border border-red-500/20',
      updatedAt: 'Updated 1d ago',
      network: {
        name: 'Avalanche',
        color: 'bg-red-500/10 text-[#F87171] border border-red-500/20',
        dotColor: 'bg-[#F87171]'
      },
      status: {
        name: 'Draft',
        color: 'bg-[#18181b] text-[#9CA3AF] border border-[#27272A]',
        dotColor: 'bg-[#52525B]'
      },
      collaborators: [
        { seed: 'John', name: 'John' },
        { seed: 'Felix', name: 'Felix' }
      ],
      delay: 'delay-150'
    },
    {
      id: '4',
      name: 'Staking Vault',
      icon: <Coins className="w-5 h-5 text-orange-400" />,
      iconColor: 'bg-orange-500/10 border border-orange-500/20',
      updatedAt: 'Updated 2d ago',
      network: {
        name: 'Hyperion',
        color: 'bg-purple-500/10 text-[#A78BFA] border border-purple-500/20',
        dotColor: 'bg-[#A78BFA]'
      },
      status: {
        name: 'Mainnet',
        color: 'bg-[#022c22] text-[#4ade80] border border-[#059669]/30',
        dotColor: 'bg-[#4ade80]'
      },
      collaborators: [
        { seed: 'Milo', name: 'Milo' }
      ],
      delay: 'delay-200'
    }
  ];

  const createCard: ProjectCardProps = {
    id: 'create',
    name: 'Create Project',
    icon: <Plus className="w-6 h-6 text-[#71717A]" />,
    iconColor: '',
    updatedAt: '',
    network: { name: '', color: '', dotColor: '' },
    status: { name: '', color: '', dotColor: '' },
    collaborators: [],
    isCreateCard: true,
    delay: 'delay-200'
  };

  const projectDetails: ProjectDetailsPanelProps = {
    projectName: 'DeFi Swap Protocol',
    projectIcon: <ArrowRightLeft className="w-7 h-7 text-indigo-400" />,
    iconColor: 'bg-indigo-500/10 border border-indigo-500/20',
    status: 'Healthy',
    version: 'v2.4.0',
    metrics: [
      { label: 'Users (24h)', value: '1,240', change: '12%', isPositive: true },
      { label: 'Transactions', value: '45.2k', change: '8%', isPositive: true },
      { label: 'Gas Used', value: '12.8G', change: '2%', isPositive: false }
    ],
    deployment: {
      contract: 'SwapRouter.sol',
      status: 'Active',
      address: '0x71C...93A2',
      network: 'Hyperion',
      deployedAt: 'Oct 24, 10:42 AM'
    },
    aiSuggestions: [
      {
        id: '1',
        severity: 'warning',
        severityColor: 'bg-amber-500',
        title: 'High Gas Usage Detected',
        description: 'The swapExactTokens function consumes 15% more gas than average. Optimize loop logic.',
        hasActions: true
      },
      {
        id: '2',
        severity: 'info',
        severityColor: 'bg-blue-500',
        title: 'Verify Source Code',
        description: 'Contract source verification is pending on Hyperion Explorer.'
      }
    ],
    activities: [
      {
        id: '1',
        icon: <FileCode className="w-3.5 h-3.5 text-purple-400" />,
        iconColor: 'text-purple-400',
        title: 'Contract Update',
        description: 'Alex updated Token.sol',
        time: '2m'
      },
      {
        id: '2',
        icon: <GitCommit className="w-3.5 h-3.5 text-blue-400" />,
        iconColor: 'text-blue-400',
        title: 'New Commit',
        description: 'Fix overflow issue #42',
        time: '1h'
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
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <main className="flex-1 overflow-y-auto bg-[#020617] relative scroll-smooth p-6 hide-scrollbar">
          <div className="max-w-6xl mx-auto flex flex-col h-full">
            <div className="animate-enter">
              <ProjectsToolbar />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
              <ProjectCard {...createCard} />
            </div>
          </div>
        </main>

        <ProjectDetailsPanel {...projectDetails} />
      </div>
    </div>
  );
}