import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string | React.ReactNode;
  icon?: React.ElementType;
  iconColor?: string;
}

export const MetricCard = ({ title, value, subtitle, icon: Icon, iconColor }: MetricCardProps) => {
  return (
    <div className="bg-[#101322] border border-[#1F1F22]/20 shadow-[0_18px_40px_rgba(0,0,0,0.55)] p-5 rounded-xl flex flex-col justify-between h-32 hover:translate-y-[-2px] transition-transform duration-300">
      <div className="flex items-center justify-between">
        <span className="text-[#9CA3AF] text-xs font-medium">{title}</span>
        {Icon && <Icon className={`w-4 h-4 ${iconColor || 'text-[#6366F1]'}`} />}
      </div>
      <div>
        <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
        <div className="text-[11px] mt-1">{subtitle}</div>
      </div>
    </div>
  );
};