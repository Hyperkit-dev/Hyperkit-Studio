import React from 'react';
import {
  Rocket, MoreHorizontal, GitBranch, GitCommitHorizontal,
  ExternalLink, RotateCcw, Check, Loader2, AlertCircle, Clock
} from 'lucide-react';

// Types
export interface PipelineStage {
  name: string;
  duration: string;
  status: 'completed' | 'running' | 'pending';
  message: string;
}

export interface DeploymentDetails {
  id: string;
  title: string;
  status: 'ready' | 'building' | 'failed' | 'queued';
  commit: {
    message: string;
    author: string;
    authorAvatar: string;
    timestamp: string;
    branch: string;
    hash: string;
  };
  stages: PipelineStage[];
  logs: string[];
}

interface DeploymentDetailsPanelProps {
  deployment?: DeploymentDetails;
}

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

// Pipeline Stage Component
interface PipelineStageItemProps {
  stage: PipelineStage;
  isLast?: boolean;
}

const PipelineStageItem: React.FC<PipelineStageItemProps> = ({ stage, isLast }) => {
  const isCompleted = stage.status === 'completed';
  const isRunning = stage.status === 'running';
  
  return (
    <div className={`flex gap-3 relative ${!isLast ? 'pb-4' : ''}`}>
      <div className={`w-3.5 h-3.5 rounded-full bg-slate-950 flex items-center justify-center shrink-0 z-10 mt-0.5 ${
        isCompleted ? 'border border-emerald-500' : isRunning ? 'border border-blue-500' : 'border border-gray-700'
      }`}>
        {isCompleted && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>}
        {isRunning && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-0.5">
          <span className="text-gray-300 font-medium">{stage.name}</span>
          <span className="text-gray-500">{stage.duration}</span>
        </div>
        <div className={`text-[10px] ${
          isCompleted && stage.name === 'Deploy' 
            ? 'text-emerald-400' 
            : isRunning 
            ? 'text-blue-400' 
            : 'text-gray-500'
        }`}>
          {stage.message}
        </div>
      </div>
    </div>
  );
};

// Console Log Line Component
interface ConsoleLogLineProps {
  log: string;
  type?: 'default' | 'success' | 'error';
}

const ConsoleLogLine: React.FC<ConsoleLogLineProps> = ({ log, type = 'default' }) => {
  const colorClass = type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-red-400' : 'text-gray-500';
  
  return <div className={colorClass}>{log}</div>;
};

// Main Panel Component
export const DeploymentDetailsPanel: React.FC<DeploymentDetailsPanelProps> = ({ deployment }) => {
  // Default deployment data if none provided
  const defaultDeployment: DeploymentDetails = {
    id: 'dpl_8x92...29a',
    title: 'Production Deploy',
    status: 'ready',
    commit: {
      message: 'feat: add yield strategy',
      author: 'AlexD',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      timestamp: '2 mins ago',
      branch: 'main',
      hash: '8a2f9c'
    },
    stages: [
      { name: 'Build', duration: '42s', status: 'completed', message: 'Cached artifacts used' },
      { name: 'Test', duration: '1m 20s', status: 'completed', message: 'All checks passed (142/142)' },
      { name: 'Deploy', duration: '24s', status: 'completed', message: 'Deployed to Ethereum Mainnet' }
    ],
    logs: [
      '> Preparing deployment environment...',
      '> Verifying contract source code...',
      '> Optimization runs: 200',
      '> Generating ABI...',
      '> Contract deployed at 0x7a2...9c1',
      '> Verification successful',
      '> Cleaning up...'
    ]
  };

  const currentDeployment = deployment || defaultDeployment;

  return (
    <aside className="hidden xl:flex w-[400px] bg-slate-950 border-l border-gray-800 flex-col shrink-0 z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Rocket className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{currentDeployment.title}</div>
            <div className="text-[10px] text-gray-500 font-mono">ID: {currentDeployment.id}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={currentDeployment.status} />
          <button className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Commit Info */}
        <div className="bg-slate-900 border border-gray-800 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <img 
              src={currentDeployment.commit.authorAvatar} 
              className="w-8 h-8 rounded-full border border-gray-700 opacity-80" 
              alt={currentDeployment.commit.author}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white font-medium mb-0.5">
                {currentDeployment.commit.message}
              </p>
              <p className="text-[10px] text-gray-400">
                Committed by <span className="text-white">{currentDeployment.commit.author}</span> {currentDeployment.commit.timestamp}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">
            <div className="flex items-center gap-1 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">
              <GitBranch className="w-3 h-3" />
              <span className="font-mono">{currentDeployment.commit.branch}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">
              <GitCommitHorizontal className="w-3 h-3" />
              <span className="font-mono">{currentDeployment.commit.hash}</span>
            </div>
          </div>
        </div>

        {/* Pipeline Stages */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 mb-3">Pipeline Stages</h3>
          <div className="relative pl-2 space-y-0">
            {/* Vertical Line */}
            <div className="absolute top-2 bottom-4 left-[15px] w-px bg-gray-800"></div>
            
            {currentDeployment.stages.map((stage, index) => (
              <PipelineStageItem 
                key={stage.name} 
                stage={stage} 
                isLast={index === currentDeployment.stages.length - 1} 
              />
            ))}
          </div>
        </div>

        {/* Console Logs */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-semibold text-gray-300">Console Logs</h3>
            <button className="text-[10px] text-purple-400 hover:text-purple-300 transition-colors">
              Expand
            </button>
          </div>
          <div className="bg-slate-950 border border-gray-700 rounded-lg p-3 font-mono text-[10px] leading-relaxed overflow-hidden h-32 relative group">
            {currentDeployment.logs.map((log, index) => (
              <ConsoleLogLine 
                key={index} 
                log={log}
                type={
                  log.includes('deployed') || log.includes('successful') ? 'success' :
                  log.includes('error') || log.includes('failed') ? 'error' :
                  'default'
                }
              />
            ))}
            
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Optional: Error Alert (conditional) */}
        {currentDeployment.status === 'failed' && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 flex gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <div className="text-xs font-medium text-red-400 mb-0.5">Deployment Failed</div>
              <div className="text-[10px] text-gray-400">
                Gas limit exceeded during execution. Check network conditions.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800 bg-slate-950 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white text-xs font-medium transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          Explorer
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
          Rollback
        </button>
      </div>
    </aside>
  );
};

export default DeploymentDetailsPanel;