import React, { useState } from 'react';
import {
  Activity, Timer, CheckCircle2, Plus, Folder,
  GitCommitHorizontal, Check, Loader2, AlertCircle, Clock
} from 'lucide-react';

// Types
export interface Deployment {
  id: string;
  project: string;
  commit: {
    hash: string;
    message: string;
    author: string;
    timestamp: string;
  };
  environment: 'Production' | 'Staging' | 'Devnet' | 'Testnet';
  network: string;
  networkColor: string;
  status: 'ready' | 'building' | 'failed' | 'queued';
  time: string;
}

interface DeploymentMainContentProps {
  selectedDeployment: string;
  onSelectDeployment: (id: string) => void;
}

// Metric Card Component
interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  chart?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, icon, chart }) => {
  return (
    <div className="bg-slate-900 border border-gray-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{label}</span>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold text-white tracking-tight">{value}</span>
        {change && (
          <span className="text-xs text-emerald-400 mb-1 flex items-center gap-1">
            {change}
          </span>
        )}
      </div>
      {chart && (
        <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 35 L10 32 L20 36 L30 25 L40 30 L50 15 L60 20 L70 10 L80 18 L90 5 L100 15 V40 H0 Z" fill="#7C3AED"></path>
            <path d="M0 35 L10 32 L20 36 L30 25 L40 30 L50 15 L60 20 L70 10 L80 18 L90 5 L100 15" stroke="#A78BFA" strokeWidth="1" fill="none"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: 'ready' | 'building' | 'failed' | 'queued';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    ready: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      icon: <Check className="w-3 h-3" />,
      label: 'Ready'
    },
    building: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
      label: 'Building'
    },
    failed: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-400',
      icon: <AlertCircle className="w-3 h-3" />,
      label: 'Failed'
    },
    queued: {
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/20',
      text: 'text-gray-400',
      icon: <Clock className="w-3 h-3" />,
      label: 'Queued'
    }
  };

  const { bg, border, text, icon, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium ${bg} ${text} border ${border}`}>
      {icon} {label}
    </span>
  );
};

// Deployment Table Row Component
interface DeploymentRowProps {
  deployment: Deployment;
  isSelected?: boolean;
  onClick?: () => void;
}

const DeploymentRow: React.FC<DeploymentRowProps> = ({ deployment, isSelected, onClick }) => {
  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer group border-l-2 transition-colors ${
        isSelected
          ? 'bg-purple-600/5 border-l-purple-600'
          : 'border-l-transparent hover:bg-slate-800'
      }`}
    >
      <td className="px-5 py-3">
        <div className="font-medium text-white flex items-center gap-2">
          <Folder className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400' : 'text-gray-600'}`} />
          {deployment.project}
        </div>
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <GitCommitHorizontal className="w-3.5 h-3.5 text-gray-600" />
          <span className="font-mono text-gray-400">{deployment.commit.hash}</span>
          <span className="text-gray-600 truncate max-w-[120px]">{deployment.commit.message}</span>
        </div>
      </td>
      <td className="px-5 py-3">
        <span className="text-[10px] bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-gray-300">
          {deployment.environment}
        </span>
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${deployment.networkColor}`}></div>
          <span className="text-gray-300">{deployment.network}</span>
        </div>
      </td>
      <td className="px-5 py-3">
        <StatusBadge status={deployment.status} />
      </td>
      <td className="px-5 py-3 text-right text-gray-500">{deployment.time}</td>
    </tr>
  );
};

// Main Content Component
export const DeploymentMainContent: React.FC<DeploymentMainContentProps> = ({
  selectedDeployment,
  onSelectDeployment
}) => {
  const deployments: Deployment[] = [
    {
      id: 'dpl_001',
      project: 'DeFi Vault V2',
      commit: { hash: '8a2f9c', message: 'feat: add yield strategy', author: 'AlexD', timestamp: '2m ago' },
      environment: 'Production',
      network: 'Ethereum',
      networkColor: 'bg-indigo-500',
      status: 'ready',
      time: '2m ago'
    },
    {
      id: 'dpl_002',
      project: 'NFT Marketplace',
      commit: { hash: '4b9x12', message: 'fix: image lazy load', author: 'Sarah', timestamp: '14m ago' },
      environment: 'Staging',
      network: 'Optimism',
      networkColor: 'bg-blue-500',
      status: 'building',
      time: '14m ago'
    },
    {
      id: 'dpl_003',
      project: 'DeFi Vault V2',
      commit: { hash: '9c1b22', message: 'chore: update deps', author: 'Mike', timestamp: '2h ago' },
      environment: 'Devnet',
      network: 'Polygon',
      networkColor: 'bg-violet-500',
      status: 'failed',
      time: '2h ago'
    },
    {
      id: 'dpl_004',
      project: 'Governance DAO',
      commit: { hash: '2d99aa', message: 'feat: voting proposal', author: 'Jane', timestamp: '5h ago' },
      environment: 'Testnet',
      network: 'Sepolia',
      networkColor: 'bg-yellow-500',
      status: 'queued',
      time: '5h ago'
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-slate-950 relative p-6">
      <div className="max-w-6xl mx-auto flex flex-col h-full">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard
            label="Peak TPS"
            value="2,492"
            change="+12%"
            icon={<Activity className="w-3.5 h-3.5 text-purple-400" />}
            chart
          />
          <MetricCard
            label="Avg. Build Time"
            value="1m 42s"
            change="-8s"
            icon={<Timer className="w-3.5 h-3.5 text-blue-400" />}
          />
          <MetricCard
            label="Success Rate"
            value="98.2%"
            icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <select className="appearance-none bg-slate-900 border border-gray-700 text-white text-xs rounded-lg px-4 py-1.5 focus:outline-none focus:border-purple-500/50 hover:bg-slate-800 transition-colors cursor-pointer">
              <option>All Environments</option>
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
            <select className="appearance-none bg-slate-900 border border-gray-700 text-white text-xs rounded-lg px-4 py-1.5 focus:outline-none focus:border-purple-500/50 hover:bg-slate-800 transition-colors cursor-pointer">
              <option>All Statuses</option>
              <option>Ready</option>
              <option>Building</option>
              <option>Failed</option>
            </select>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all">
            <Plus className="w-3.5 h-3.5" />
            New Deployment
          </button>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-gray-800 text-gray-500 font-medium uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 w-48">Project</th>
                <th className="px-5 py-3">Commit</th>
                <th className="px-5 py-3">Environment</th>
                <th className="px-5 py-3">Network</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {deployments.map((deployment) => (
                <DeploymentRow
                  key={deployment.id}
                  deployment={deployment}
                  isSelected={selectedDeployment === deployment.id}
                  onClick={() => onSelectDeployment(deployment.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default DeploymentMainContent;