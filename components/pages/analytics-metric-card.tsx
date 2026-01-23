import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: React.ReactNode;
  iconColor: string;
  changeColor: string;
  glowColor: string;
  delay?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor,
  changeColor,
  glowColor,
  delay = 'delay-75'
}) => {
  return (
    <div className={`glass-panel rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group animate-enter ${delay}`}>
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold">
          {title}
        </span>
        <div className={`${iconColor} rounded p-0.5`}>
          {icon}
        </div>
      </div>
      <div className="z-10">
        <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
        <div className="text-[10px] text-[#71717A] mt-1">
          <span className={`${changeColor} font-medium`}>{change}</span> {changeLabel}
        </div>
      </div>
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${glowColor} rounded-full blur-2xl group-hover:opacity-100 transition-opacity`} />
    </div>
  );
};