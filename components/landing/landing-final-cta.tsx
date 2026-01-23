import React from 'react';

export const FinalCTA: React.FC = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#1a1a24] to-[#050508] text-center p-12 md:p-24">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      {/* Stronger purple glow for CTA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-600/10 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6">
          Describe it once.<br />Ship the app in minutes.
        </h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto text-lg font-light">
          Join 100+ Builders shipping faster with Hyperkit.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
        <a
          href="/overview" 
          className="h-12 px-8 btn-primary text-white rounded-full font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2 hover:scale-105"
        >
          Start Building Free
        </a>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;