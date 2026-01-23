import React from 'react';

export const TimeSeriesChart: React.FC = () => {
  return (
    <div className="lg:col-span-2 glass-panel rounded-xl p-5 relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">API Volume &amp; Contract Calls</h3>
          <p className="text-[10px] text-[#71717A]">Requests per minute (RPM) over last 30 days</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-[10px] text-[#9CA3AF]">API</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-[10px] text-[#9CA3AF]">Contracts</span>
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="relative h-64 w-full border border-[#1F1F22] rounded bg-[#050814]/50" style={{
        backgroundSize: '40px 40px',
        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
      }}>
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[9px] text-[#52525B] py-2 px-1 text-right font-mono">
          <span>5k</span>
          <span>2.5k</span>
          <span>1k</span>
          <span>0</span>
        </div>

        {/* X-Axis Labels */}
        <div className="absolute left-8 right-0 bottom-0 h-6 flex justify-between text-[9px] text-[#52525B] px-4 pt-1 font-mono">
          <span>Oct 1</span>
          <span>Oct 8</span>
          <span>Oct 15</span>
          <span>Oct 22</span>
          <span>Oct 29</span>
        </div>

        {/* SVG Chart Area */}
        <div className="absolute left-8 right-0 top-0 bottom-6 overflow-hidden">
          <svg preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Lines (Horizontal) */}
            <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#1F1F22" strokeDasharray="4 4" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1F1F22" strokeDasharray="4 4" />
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#1F1F22" strokeDasharray="4 4" />

            {/* Series 1: API (Purple) */}
            <path d="M0,80 C20,75 40,60 60,65 S100,40 120,45 S160,30 180,35 S220,50 240,45 S280,20 300,25 S340,40 360,35 S400,10 420,15 S460,25 480,20 S520,30 540,25 S600,40 620,35 S660,15 680,10 S720,20 740,15 S780,30 800,25 S840,40 860,35 S900,10 920,15 S960,25 980,20 S1020,30 1040,25 S1100,40 1120,35 L1200,40 L1200,100 L0,100 Z" fill="url(#purpleGradient)" vectorEffect="non-scaling-stroke" />
            <path d="M0,80 C20,75 40,60 60,65 S100,40 120,45 S160,30 180,35 S220,50 240,45 S280,20 300,25 S340,40 360,35 S400,10 420,15 S460,25 480,20 S520,30 540,25 S600,40 620,35 S660,15 680,10 S720,20 740,15 S780,30 800,25 S840,40 860,35 S900,10 920,15 S960,25 980,20 S1020,30 1040,25 S1100,40 1120,35 L1200,40" fill="none" stroke="#A78BFA" strokeWidth="2" vectorEffect="non-scaling-stroke" />

            {/* Series 2: Contracts (Teal) */}
            <path d="M0,90 C30,88 60,85 90,82 S150,70 180,75 S240,80 270,72 S330,60 360,65 S420,50 450,55 S510,65 540,60 S600,45 630,50 S690,40 720,45 S780,55 810,50 S870,30 900,35 S960,45 990,40 S1050,55 1080,50 L1200,60 L1200,100 L0,100 Z" fill="url(#tealGradient)" vectorEffect="non-scaling-stroke" opacity="0.6" />
            <path d="M0,90 C30,88 60,85 90,82 S150,70 180,75 S240,80 270,72 S330,60 360,65 S420,50 450,55 S510,65 540,60 S600,45 630,50 S690,40 720,45 S780,55 810,50 S870,30 900,35 S960,45 990,40 S1050,55 1080,50 L1200,60" fill="none" stroke="#2DD4BF" strokeWidth="2" vectorEffect="non-scaling-stroke" />

            {/* Interactive Vertical Line */}
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
            <circle cx="70%" cy="20%" r="3" fill="#A78BFA" stroke="#0B1020" strokeWidth="2" />
            <circle cx="70%" cy="45%" r="3" fill="#2DD4BF" stroke="#0B1020" strokeWidth="2" />
          </svg>
          
          {/* Tooltip Overlay */}
          <div className="absolute top-[15%] left-[72%] bg-[#18181B] border border-[#27272A] rounded-lg p-2 shadow-xl pointer-events-none">
            <div className="text-[10px] text-[#71717A] mb-1">Oct 24, 14:00</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-white">4,291 req/m</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-xs font-medium text-white">1,820 calls/m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};