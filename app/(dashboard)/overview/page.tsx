"use client";
import React from 'react';
import { Rocket, Code, HardDrive, Package, ArrowUp } from 'lucide-react';
import { MetricCard } from '@/components/pages/overview-metrics-card';
import { ProjectDetails } from '@/components/pages/overview-project-details';
import { TrafficChart } from '@/components/pages/overview-traffic-chart';
import { DeploymentsTable } from '@/components/pages/overview-deployments-table';
import { RightPanel } from '@/components/pages/overview-right-panel';

export default function HyperkitDashboard() {
  return (
    <div className="bg-[#020617] text-[#F9FAFB] w-full h-screen flex flex-col overflow-hidden text-sm antialiased">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>
      <div className="flex flex-1 overflow-hidden z-10 relative">
        <main className="flex-1 overflow-y-auto bg-[#020617] relative scroll-smooth p-6 lg:p-8 scrollbar-hide" 
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#9CA3AF] text-sm">Projects /</span>
                  <span className="text-white font-medium text-sm">DeFi Swap Protocol</span>
                </div>
                <h1 className="text-2xl font-semibold text-white tracking-tight">Project Overview</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg border border-[#27272A] text-[#E5E7EB] hover:bg-[#18181B] text-xs font-medium transition-colors">
                  View Logs
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:-translate-y-[1px] text-white text-xs font-medium transition-all flex items-center gap-2">
                  <Rocket className="w-3.5 h-3.5" />
                  Deploy to Mainnet
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Project Status"
                value="Active"
                subtitle={<span className="text-[#52525B]">Uptime: 99.9%</span>}
                icon={() => <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
              />
              <MetricCard
                title="Lines of Code"
                value="12,450"
                subtitle={
                  <span className="text-[#22C55E] flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" /> 240 this week
                  </span>
                }
                icon={Code}
                iconColor="text-[#6366F1]"
              />
              <MetricCard
                title="Code Size"
                value="4.2 MB"
                subtitle={<span className="text-[#52525B]">Within limits</span>}
                icon={HardDrive}
                iconColor="text-[#8B5CF6]"
              />
              <MetricCard
                title="Bundled Size"
                value="845 KB"
                subtitle={<span className="text-[#A855F7]">Optimized (-12%)</span>}
                icon={Package}
                iconColor="text-[#EC4899]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ProjectDetails />
              <div className="lg:col-span-2">
                <TrafficChart />
              </div>
            </div>

            <DeploymentsTable />
          </div>
        </main>

        <RightPanel />
      </div>
    </div>
  );
}