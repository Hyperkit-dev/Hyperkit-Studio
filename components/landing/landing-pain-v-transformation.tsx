import React from 'react';
import { Lightbulb, Rocket, Zap } from 'lucide-react';
import SocialProof from '@/components/landing/landing-social-proof';

export const PainVsTransformation: React.FC = () => {
  return (
    <>
      <SocialProof />

      <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
        <PainPoints />
        <TransformationCard />
      </div>
    </>
  );
};


const PainPoints: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-tight text-white mb-6">
        Stop wrestling with boilerplate.
      </h2>
      <div className="space-y-8">
        <div className="flex gap-5 group">
          <div className="w-px h-16 bg-gradient-to-b from-violet-500 to-transparent group-hover:h-full transition-all duration-500"></div>
          <div>
            <h3 className="text-lg text-slate-200 font-medium mb-2">Slow development cycles</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Weeks spent configuring databases, authentication, and API endpoints before writing core logic.
            </p>
          </div>
        </div>
        <div className="flex gap-5 group">
          <div className="w-px h-16 bg-gradient-to-b from-violet-500 to-transparent group-hover:h-full transition-all duration-500"></div>
          <div>
            <h3 className="text-lg text-slate-200 font-medium mb-2">Dependency on engineers</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Simple changes require a pull request, code review, and deployment pipeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransformationCard: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-8 border border-white/5 relative group">
      <div className="absolute -top-3 -right-3 px-3 py-1 bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wide rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]">
        The New Way
      </div>
      
      {/* Transformation Diagram */}
      <div className="flex items-center justify-between text-center relative z-10 py-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-violet-500/30 transition-colors">
            <Lightbulb className="w-6 h-6 text-slate-400" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Idea</span>
        </div>
        
        <div className="flex-1 h-px bg-gradient-to-r from-white/5 via-violet-500/50 to-white/5 mx-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#05020B] p-1.5 rounded-full border border-violet-500/20 shadow-[0_0_10px_rgba(124,58,237,0.3)]">
            <Zap className="w-3 h-3 text-violet-400 fill-violet-400" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-violet-500/10 rounded-full flex items-center justify-center border border-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
            <Rocket className="w-6 h-6 text-violet-400" />
          </div>
          <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">Live App</span>
        </div>
      </div>
      
      <div className="mt-8 bg-[#020205] rounded-lg p-5 border border-white/5 font-mono text-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
          <span className="text-slate-500">Build complete</span>
        </div>
        <div className="text-slate-400 space-y-1">
          <p>&gt; Generative schema... <span className="text-violet-400">Done</span></p>
          <p>&gt; UI components... <span className="text-violet-400">Done</span></p>
          <p>&gt; Deploying to Edge... <span className="text-violet-400">Done (1.2s)</span></p>
        </div>
      </div>
    </div>
  );
};

export default PainVsTransformation;