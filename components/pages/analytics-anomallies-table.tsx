import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export interface AnomalyData {
  id: string;
  timestamp: string;
  event: string;
  icon: React.ReactNode;
  iconColor: string;
  source: string;
  impact: string;
  impactColor: string;
}

export interface AnomaliesTableProps {
  anomalies: AnomalyData[];
}

export const AnomaliesTable: React.FC<AnomaliesTableProps> = ({ anomalies }) => {
  return (
    <div className="glass-panel rounded-xl overflow-hidden flex-1 min-h-[200px]">
      <div className="px-5 py-3 border-b border-[#1F1F22] bg-[#0B1020] flex justify-between items-center">
        <h3 className="text-sm font-semibold text-[#D4D4D8]">Recent Anomalies</h3>
        <button className="text-xs text-purple-400 hover:text-white transition-colors">
          View All Logs
        </button>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="bg-[#101322] text-[#71717A] font-medium border-b border-[#1F1F22]">
          <tr>
            <th className="px-5 py-2.5 font-normal w-32">Timestamp</th>
            <th className="px-5 py-2.5 font-normal">Event</th>
            <th className="px-5 py-2.5 font-normal">Source</th>
            <th className="px-5 py-2.5 font-normal text-right">Impact</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1F1F22]">
          {anomalies.map((anomaly) => (
            <tr key={anomaly.id} className="hover:bg-[#151926] transition-colors">
              <td className="px-5 py-3 font-mono text-[#71717A] text-[10px]">{anomaly.timestamp}</td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className={anomaly.iconColor}>
                    {anomaly.icon}
                  </div>
                  <span className="text-[#D4D4D8]">{anomaly.event}</span>
                </div>
              </td>
              <td className="px-5 py-3 text-[#9CA3AF]">{anomaly.source}</td>
              <td className={`px-5 py-3 text-right ${anomaly.impactColor}`}>{anomaly.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};