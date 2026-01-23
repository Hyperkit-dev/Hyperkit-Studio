import React from 'react';

export interface HistoryGroupProps {
  title: string;
  date: string;
  delay?: string;
  children: React.ReactNode;
}

export const HistoryGroup = ({ title, date, delay = 'delay-75', children }: HistoryGroupProps) => {
  return (
    <div className={`animate-enter ${delay}`}>
      <div className="sticky top-0 z-10 bg-[#020617]/95 backdrop-blur-sm py-2 mb-2 border-b border-[#1F1F22] w-full flex justify-between items-center">
        <h3 className="text-xs font-semibold text-[#9CA3AF]">{title}</h3>
        <span className="text-[10px] text-[#52525B]">{date}</span>
      </div>
      
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};