import React from 'react';
import { Activity } from 'lucide-react';

export const TrafficChart = () => {
  const bars = [20, 35, 50, 45, 60, 85, 70, 65, 40, 55, 45, 30];
  
  return (
    <div className="bg-[#101322] border border-[#1F1F22]/20 shadow-[0_18px_40px_rgba(0,0,0,0.55)] rounded-xl p-5 flex flex-col h-[320px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-white flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-[#7C3AED]" /> Traffic Overview
        </h3>
        <div className="flex gap-1 bg-[#050814] p-0.5 rounded-lg border border-[#1F1F22]">
          <button className="px-2 py-0.5 rounded text-[10px] bg-[#1F1F22] text-white shadow-sm">
            24H
          </button>
          <button className="px-2 py-0.5 rounded text-[10px] text-[#6B7280] hover:text-[#D4D4D8]">
            7D
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative flex items-end justify-between gap-2 px-2">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-px bg-[#1F1F22] border-t border-dashed border-[#27272A]" />
          ))}
        </div>
        
        {bars.map((height, i) => (
          <div
            key={i}
            className={`w-full rounded-t transition-all duration-500 hover:bg-[#A78BFA] group relative ${
              i === 5 ? 'bg-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-[#1F1F22]'
            }`}
            style={{ height: `${height}%` }}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#27272A] text-white text-[10px] px-2 py-1 rounded transition-opacity whitespace-nowrap">
              {Math.round(height * 5)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-[10px] text-[#52525B] mt-3 px-1">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
  );
};