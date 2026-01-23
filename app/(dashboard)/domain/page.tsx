"use client";

import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { DomainsPageHeader } from '@/components/pages/domain-page-header';
import { DNSGuide } from '@/components/pages/domain-dns-guide';
import { DomainRow } from '@/components/pages/domain-in-row';
import { DomainConfigPanel } from '@/components/pages/domain-in-config-panel';

export default function HyperkitDomains() {
  const domains = [
    {
      domain: 'app.hyperkit.ai',
      description: 'Default Subdomain',
      projectName: 'Hyperkit Dashboard',
      projectColor: 'bg-indigo-500',
      environment: 'Production',
      status: 'connected' as const,
      statusText: 'Connected',
      lastUpdated: '2h ago'
    },
    {
      domain: 'platform.startuplab.io',
      description: 'External Domain',
      projectName: 'Startup Lab Client',
      projectColor: 'bg-pink-500',
      environment: 'Staging',
      status: 'pending' as const,
      statusText: 'Pending DNS',
      lastUpdated: '10m ago',
      icon: Loader2,
      iconBgColor: 'bg-amber-900/20 border border-amber-500/20',
      iconColor: 'text-amber-500',
      isSelected: true
    },
    {
      domain: 'api.legacy-v1.com',
      description: 'Legacy Gateway',
      projectName: 'Core API',
      projectColor: 'bg-emerald-500',
      environment: 'Production',
      status: 'error' as const,
      statusText: 'Invalid Config',
      lastUpdated: '2d ago',
      icon: AlertCircle,
      iconBgColor: 'bg-rose-900/20 border border-rose-500/20',
      iconColor: 'text-rose-500'
    },
    {
      domain: 'blog.hyperkit.ai',
      description: 'Content Hub',
      projectName: 'Marketing Site',
      projectColor: 'bg-orange-500',
      environment: 'Production',
      status: 'connected' as const,
      statusText: 'Connected',
      lastUpdated: '5d ago'
    }
  ];

  return (
    <div className="bg-[#020617] text-[#F9FAFB] w-full h-screen flex flex-col overflow-hidden text-sm antialiased">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] bg-teal-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <main className="flex-1 overflow-hidden bg-[#020617] relative flex flex-col">
          <DomainsPageHeader />

          <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <DNSGuide />

            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1F1F22] text-[10px] font-medium text-[#71717A] uppercase tracking-wider">
              <div className="col-span-4 pl-8">Domain</div>
              <div className="col-span-3">Project</div>
              <div className="col-span-2">Environment</div>
              <div className="col-span-2">SSL & Status</div>
              <div className="col-span-1 text-right">Last Updated</div>
            </div>

            <div className="divide-y divide-[#1F1F22] border border-[#1F1F22] rounded-lg bg-[#0B1020] overflow-hidden">
              {domains.map((domain, index) => (
                <DomainRow key={index} {...domain} />
              ))}
            </div>
          </div>
        </main>

        <DomainConfigPanel />
      </div>
    </div>
  );
}