import React from 'react';
import { List, ArrowRight, GitCommit, GitBranch } from 'lucide-react';

export const DeploymentsTable = () => {
  const deployments = [
    { commit: '8f3a2c', status: 'Ready', statusColor: 'emerald', branch: 'main', env: 'Production', duration: '45s' },
    { commit: 'c4b911', status: 'Building', statusColor: 'blue', branch: 'feat/swap', env: 'Preview', duration: '--' },
    { commit: 'e210ac', status: 'Failed', statusColor: 'red', branch: 'fix/api', env: 'Dev', duration: '12s' }
  ];

  return (
    <div className="bg-[#101322] border border-[#1F1F22]/20 shadow-[0_18px_40px_rgba(0,0,0,0.55)] rounded-xl overflow-hidden">
      <div className="p-5 border-b border-[#1F1F22] flex items-center justify-between">
        <h3 className="font-medium text-white flex items-center gap-2 text-sm">
          <List className="w-4 h-4 text-[#7C3AED]" /> Recent Deployments
        </h3>
        <button className="text-[#9CA3AF] hover:text-white text-xs flex items-center gap-1 transition-colors">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] text-[#6B7280] uppercase tracking-wider bg-[#0B1020]/50 border-b border-[#1F1F22]">
              <th className="px-6 py-3 font-medium">Commit</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Branch</th>
              <th className="px-6 py-3 font-medium">Environment</th>
              <th className="px-6 py-3 font-medium text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-[#1F1F22]">
            {deployments.map((deployment, i) => (
              <tr key={i} className="group hover:bg-[#101322] transition-colors">
                <td className="px-6 py-4 font-mono text-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-3 h-3 text-[#52525B]" /> {deployment.commit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-${deployment.statusColor}-500/10 text-${deployment.statusColor}-400 border border-${deployment.statusColor}-500/20 text-[10px] font-medium ${deployment.status === 'Building' ? 'animate-pulse' : ''}`}>
                    <div className={`w-1 h-1 rounded-full bg-${deployment.statusColor}-400`} />
                    {deployment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#D4D4D8] flex items-center gap-2">
                  <GitBranch className="w-3 h-3 text-[#52525B]" /> {deployment.branch}
                </td>
                <td className="px-6 py-4 text-[#9CA3AF]">{deployment.env}</td>
                <td className="px-6 py-4 text-right text-[#9CA3AF]">{deployment.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};