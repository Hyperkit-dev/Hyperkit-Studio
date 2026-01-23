"use client";

import React from 'react';
import { ShoppingCart, Coins, Vote, Rocket } from 'lucide-react';
import { TemplatesToolbar } from '@/components/pages/templates-toolbar';
import { TemplateCard, TemplateCardProps } from '@/components/pages/templates-card';
import { TemplatePreviewPanel } from '@/components/pages/template-preview-panel';

export default function HyperkitTemplates() {
  const templates: TemplateCardProps[] = [
    {
      title: 'NFT Marketplace',
      description: 'Full-stack NFT marketplace with minting, listing, and buying functionality. Includes indexer integration.',
      icon: <ShoppingCart className="w-6 h-6 text-white/90" />,
      tags: ['NFTs', 'Commerce'],
      networks: [
        { color: 'bg-slate-700/50', name: 'Ethereum' },
        { color: 'bg-purple-900/50', name: 'Polygon' },
        { color: 'bg-blue-900/50', name: 'Arbitrum' },
        { color: 'bg-red-900/50', name: 'Optimism' }
      ],
      badge: { text: 'Popular', color: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
      isActive: true,
      delay: 'delay-75',
      thumbPattern: 'thumb-pattern-1'
    },
    {
      title: 'Yield Farming Vault',
      description: 'ERC-4626 compatible yield vault with strategy adapters for Aave and Compound.',
      icon: <Coins className="w-6 h-6 text-white/90" />,
      tags: ['DeFi', 'Staking'],
      networks: [
        { color: 'bg-blue-900/50', name: 'Arbitrum' },
        { color: 'bg-red-900/50', name: 'Optimism' }
      ],
      badge: { text: 'New', color: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' },
      delay: 'delay-100',
      thumbPattern: 'thumb-pattern-2'
    },
    {
      title: 'DAO Governance',
      description: 'Complete governance structure with proposal creation, voting mechanisms, and timelock execution.',
      icon: <Vote className="w-6 h-6 text-white/90" />,
      tags: ['DAO', 'Governance'],
      networks: [
        { color: 'bg-slate-700/50', name: 'Ethereum' }
      ],
      delay: 'delay-150',
      thumbPattern: 'thumb-pattern-3'
    },
    {
      title: 'Token Launchpad',
      description: 'Pre-sale and IDO contract suite with vesting schedules and whitelist management.',
      icon: <Rocket className="w-6 h-6 text-white/90" />,
      tags: ['Token', 'Sale'],
      networks: [
        { color: 'bg-slate-700/50', name: 'Ethereum' },
        { color: 'bg-blue-900/50', name: 'Arbitrum' }
      ],
      delay: 'delay-200',
      thumbPattern: 'thumb-pattern-4'
    }
  ];

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
        
        .thumb-pattern-1 { 
          background-image: radial-gradient(circle at top right, rgba(124, 58, 237, 0.2), transparent 40%), 
                           radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.2), transparent 40%); 
        }
        .thumb-pattern-2 { 
          background-image: radial-gradient(circle at center, rgba(236, 72, 153, 0.15), transparent 50%); 
        }
        .thumb-pattern-3 { 
          background-image: linear-gradient(45deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%); 
        }
        .thumb-pattern-4 { 
          background-image: radial-gradient(circle at top left, rgba(245, 158, 11, 0.15), transparent 40%); 
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
              <TemplatesToolbar />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 pb-10">
              {templates.map((template, index) => (
                <TemplateCard key={index} {...template} />
              ))}
            </div>
          </div>
        </main>

        <TemplatePreviewPanel />
      </div>
    </div>
  );
}