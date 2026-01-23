"use client";

import React from 'react';
import { 
  ArrowUpRight, 
  Zap, 
  AlertTriangle, 
  Server,
  AlertCircle,
  ShieldAlert,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import { AnalyticsToolbar } from '@/components/pages/analytics-toolbar';
import { MetricCard, MetricCardProps } from '@/components/pages/analytics-metric-card';
import { TimeSeriesChart } from '@/components/pages/analytics-time-series-chart';
import { ErrorsChart, ErrorData } from '@/components/pages/analytics-error-chart';
import { AnomaliesTable, AnomalyData } from '@/components/pages/analytics-anomallies-table';
import { AIInsightsPanel, InsightData } from '@/components/pages/analytics-all-in-insights';

export default function HyperkitAnalytics() {
  const metrics: MetricCardProps[] = [
    {
      title: 'Total Requests',
      value: '24.8M',
      change: '+12.5%',
      changeLabel: 'vs last period',
      icon: <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />,
      iconColor: 'bg-emerald-400/10',
      changeColor: 'text-emerald-400',
      glowColor: 'bg-purple-500/10 group-hover:bg-purple-500/20',
      delay: 'delay-75'
    },
    {
      title: 'Avg Latency',
      value: '42ms',
      change: '-8ms',
      changeLabel: 'improvement',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      iconColor: 'bg-amber-400/10',
      changeColor: 'text-emerald-400',
      glowColor: 'bg-amber-500/10 group-hover:bg-amber-500/20',
      delay: 'delay-75'
    },
    {
      title: 'Error Rate',
      value: '0.04%',
      change: '+0.01%',
      changeLabel: 'degradation',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />,
      iconColor: 'bg-rose-400/10',
      changeColor: 'text-rose-400',
      glowColor: 'bg-rose-500/10 group-hover:bg-rose-500/20',
      delay: 'delay-75'
    },
    {
      title: 'Active Instances',
      value: '14',
      change: 'Auto-scaled',
      changeLabel: 'from 8',
      icon: <Server className="w-3.5 h-3.5 text-blue-400" />,
      iconColor: 'bg-blue-400/10',
      changeColor: 'text-white',
      glowColor: 'bg-blue-500/10 group-hover:bg-blue-500/20',
      delay: 'delay-75'
    }
  ];

  const errors: ErrorData[] = [
    {
      label: '500 Internal Server',
      percentage: 42,
      color: 'bg-rose-500',
      hoverColor: 'group-hover:bg-rose-400'
    },
    {
      label: '429 Rate Limit',
      percentage: 35,
      color: 'bg-amber-500',
      hoverColor: 'group-hover:bg-amber-400'
    },
    {
      label: '400 Bad Request',
      percentage: 15,
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-400'
    },
    {
      label: '401 Unauthorized',
      percentage: 8,
      color: 'bg-purple-500',
      hoverColor: 'group-hover:bg-purple-400'
    }
  ];

  const anomalies: AnomalyData[] = [
    {
      id: '1',
      timestamp: 'Oct 24 14:02:12',
      event: 'High Latency Spike (>500ms)',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      iconColor: 'text-rose-500',
      source: 'API Gateway / us-east-1',
      impact: 'Critical',
      impactColor: 'text-rose-400'
    },
    {
      id: '2',
      timestamp: 'Oct 24 13:45:00',
      event: 'Rate Limit Exceeded',
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
      iconColor: 'text-amber-500',
      source: 'IP: 192.168.x.x',
      impact: 'Moderate',
      impactColor: 'text-amber-400'
    }
  ];

  const insights: InsightData[] = [
    {
      id: '1',
      type: 'positive',
      icon: <TrendingUp className="w-4 h-4 mt-0.5" />,
      iconColor: 'text-emerald-400',
      borderColor: 'border-[#1F1F22]',
      title: 'Traffic Efficiency',
      description: 'Traffic has increased by 12.5% while maintaining stable latency. Your caching strategy deployed at 09:00 AM is performing well.',
      tags: ['Optimization']
    },
    {
      id: '2',
      type: 'warning',
      icon: <AlertTriangle className="w-4 h-4 mt-0.5" />,
      iconColor: 'text-amber-400',
      borderColor: 'border-[#1F1F22]',
      title: 'Contract Gas Spikes',
      description: 'Detected irregular gas usage on the deposit() function. Average cost increased by 45% in the last hour.',
      hasActions: true
    },
    {
      id: '3',
      type: 'actionable',
      icon: <Lightbulb className="w-4 h-4 mt-0.5" />,
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      backgroundColor: 'bg-purple-900/10',
      title: 'Recommended Action',
      description: 'Database IOPS are reaching 85% capacity during peak hours. Consider enabling read-replicas for the reporting service.',
      hasActions: true
    }
  ];

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
        
        .delay-75 { animation-delay: 0.075s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-150 { animation-delay: 0.15s; }
        
        .glass-panel {
          background-color: #0B1020;
          border: 1px solid rgba(148, 163, 255, 0.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] bg-teal-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <main className="flex-1 overflow-y-auto bg-[#020617] relative scroll-smooth p-6 hide-scrollbar">
          <div className="max-w-6xl mx-auto flex flex-col h-full">
            <div className="animate-enter">
              <AnalyticsToolbar />
            </div>

            {/* KPI Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-enter delay-100">
              <TimeSeriesChart />
              <ErrorsChart errors={errors} />
            </div>

            {/* Bottom Section: Detailed Logs Preview */}
            <div className="animate-enter delay-150">
              <AnomaliesTable anomalies={anomalies} />
            </div>
          </div>
        </main>

        <AIInsightsPanel insights={insights} />
      </div>
    </div>
  );
}