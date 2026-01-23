"use client";

import React from 'react';
import { FileCode, Rocket, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { HistoryToolbar } from '@/components/pages/history-toolbar';
import { HistoryCard } from '@/components/pages/history-card';
import { HistoryGroup } from '@/components/pages/hisotry-group';
import { HistoryDetailPanel } from '@/components/pages/history-detail-panel';

export default function HyperkitHistory() {
  return (
    <div className="bg-[#020617] text-[#F9FAFB] w-full h-screen flex flex-col overflow-hidden text-sm antialiased">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <main className="flex-1 overflow-y-auto bg-[#020617] relative scroll-smooth p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="max-w-5xl mx-auto flex flex-col h-full">
            <HistoryToolbar />

            <div className="space-y-8 pb-10">
              <HistoryGroup title="Today" date="Oct 24, 2023" delay="delay-75">
                <HistoryCard
                  icon={FileCode}
                  iconBgColor="bg-purple-500/10"
                  iconColor="text-purple-400"
                  title="Smart Contract Generation"
                  subtitle="ERC-20 Token Standard • Updated Logic"
                  projectName="DeFi Swap Protocol"
                  projectIcon="bg-indigo-500/20 text-indigo-300"
                  actorName="Alex Designer"
                  actorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  status="success"
                  time="10:42 AM"
                  isActive={true}
                />

                <HistoryCard
                  icon={Rocket}
                  iconBgColor="bg-emerald-500/10"
                  iconColor="text-emerald-400"
                  title="Production Deployment"
                  subtitle="Commit: 8f3a2c • v1.2.0"
                  projectName="DeFi Swap Protocol"
                  projectIcon="bg-indigo-500/20 text-indigo-300"
                  actorName="HyperAgent"
                  status="pending"
                  time="09:15 AM"
                />

                <HistoryCard
                  icon={Download}
                  iconBgColor="bg-zinc-800"
                  iconColor="text-zinc-400"
                  title="Template Import"
                  subtitle="NFT Marketplace • Next.js"
                  projectName="NFT Market V2"
                  projectIcon="bg-pink-500/20 text-pink-300"
                  actorName="Alex Designer"
                  actorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  status="success"
                  time="08:30 AM"
                />
              </HistoryGroup>

              <HistoryGroup title="Yesterday" date="Oct 23, 2023" delay="delay-150">
                <HistoryCard
                  icon={ShieldCheck}
                  iconBgColor="bg-blue-500/10"
                  iconColor="text-blue-400"
                  title="Security Audit"
                  subtitle="Score: 98/100 • Low Risk"
                  projectName="DeFi Swap Protocol"
                  projectIcon="bg-indigo-500/20 text-indigo-300"
                  actorName="HyperAgent"
                  status="passed"
                  time="14:20 PM"
                />

                <HistoryCard
                  icon={AlertCircle}
                  iconBgColor="bg-red-500/10"
                  iconColor="text-red-400"
                  title="Build Failed"
                  subtitle="Timeout Error • 504 Gateway"
                  projectName="DeFi Swap Protocol"
                  projectIcon="bg-indigo-500/20 text-indigo-300"
                  actorName="Alex Designer"
                  actorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  status="failed"
                  time="11:05 AM"
                />
              </HistoryGroup>
            </div>
          </div>
        </main>

        <HistoryDetailPanel />
      </div>
    </div>
  );
}