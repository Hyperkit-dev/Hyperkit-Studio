import React from 'react';
import { Database, CreditCard, Webhook } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  return (
    <div id="features" className="mb-32 scroll-mt-20">
      <h2 className="text-3xl font-medium tracking-tight text-white mb-12">
        Everything you need to scale
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
        <VisualBuilderFeature />
        <AICopilotFeature />
        <IntegrationsFeature />
        <AnalyticsFeature />
      </div>
    </div>
  );
};

const VisualBuilderFeature: React.FC = () => {
  return (
    <div className="lg:col-span-2 glass-card rounded-2xl p-10 relative overflow-hidden group">
      <div className="relative z-10 max-w-sm">
        <h3 className="text-xl font-medium text-white mb-3">Visual Builder</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Drag, drop, and customize components. Pixel-perfect control without the CSS headache.
        </p>
      </div>
      {/* Mock UI */}
      <div className="absolute top-28 right-0 w-3/4 h-full bg-[#08080c] border-t border-l border-white/10 rounded-tl-2xl p-6 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 shadow-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-white/5 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs text-slate-600">
            Drop here
          </div>
          <div className="h-24 bg-violet-500/5 border border-violet-500/20 rounded-xl flex items-center justify-center text-xs text-violet-400">
            Button Component
          </div>
        </div>
      </div>
    </div>
  );
};

const AICopilotFeature: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-10 relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-xl font-medium text-white mb-3">AI Copilot</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Generate pages, write copy, and debug logic.
        </p>
      </div>
      <div className="absolute bottom-6 right-6 left-6 bg-[#0f0f13] border border-white/10 rounded-xl p-4 shadow-lg">
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
          <p className="text-xs text-slate-300">Added a user authentication flow.</p>
        </div>
      </div>
    </div>
  );
};

const IntegrationsFeature: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-10 relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-xl font-medium text-white mb-3">Integrations</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Connect to Stripe, Supabase, OpenAI, and more.
        </p>
      </div>
      <div className="absolute bottom-0 right-0 p-8 grid grid-cols-3 gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
          <Database className="w-5 h-5 text-slate-300" />
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
          <CreditCard className="w-5 h-5 text-slate-300" />
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
          <Webhook className="w-5 h-5 text-slate-300" />
        </div>
      </div>
    </div>
  );
};

const AnalyticsFeature: React.FC = () => {
  return (
    <div className="lg:col-span-2 glass-card rounded-2xl p-10 relative overflow-hidden group">
      <div className="relative z-10 max-w-sm">
        <h3 className="text-xl font-medium text-white mb-3">Built-in Analytics</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Track users, API usage, and performance metrics out of the box.
        </p>
      </div>
      {/* Chart Mock */}
      <div className="absolute bottom-0 right-0 w-3/4 h-56 flex items-end justify-around px-8 pb-8 gap-3">
        <div className="w-full bg-violet-500/10 h-[40%] rounded-t-lg border-t border-x border-violet-500/10 group-hover:h-[60%] transition-all duration-700 delay-100"></div>
        <div className="w-full bg-violet-500/20 h-[60%] rounded-t-lg border-t border-x border-violet-500/10 group-hover:h-[80%] transition-all duration-700 delay-200"></div>
        <div className="w-full bg-violet-500/30 h-[30%] rounded-t-lg border-t border-x border-violet-500/10 group-hover:h-[50%] transition-all duration-700 delay-75"></div>
        <div className="w-full bg-violet-500/40 h-[70%] rounded-t-lg border-t border-x border-violet-500/10 group-hover:h-[90%] transition-all duration-700 delay-150"></div>
      </div>
    </div>
  );
};

export default FeatureHighlights;