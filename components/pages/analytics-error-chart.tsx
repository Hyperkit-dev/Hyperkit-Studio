import React from 'react';

export interface ErrorData {
  label: string;
  percentage: number;
  color: string;
  hoverColor: string;
}

export interface ErrorsChartProps {
  errors: ErrorData[];
}

export const ErrorsChart: React.FC<ErrorsChartProps> = ({ errors }) => {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-1">Errors by Type</h3>
      <p className="text-[10px] text-[#71717A] mb-6">Distribution over last 24h</p>

      <div className="flex-1 flex flex-col justify-center space-y-5">
        {errors.map((error, index) => (
          <div key={index} className="group">
            <div className="flex justify-between text-[10px] mb-1.5">
              <span className="text-[#D4D4D8]">{error.label}</span>
              <span className="text-[#71717A]">{error.percentage}%</span>
            </div>
            <div className="w-full bg-[#1F1F22] h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full ${error.color} rounded-full ${error.hoverColor} transition-colors`}
                style={{ width: `${error.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};