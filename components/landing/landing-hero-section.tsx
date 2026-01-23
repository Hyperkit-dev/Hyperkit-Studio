import React from 'react';
import { ChevronRight, Circle, Sun, Users, Activity } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div id="hero" className="flex flex-col items-center justify-center text-center mb-24 relative scroll-mt-20">
      {/* Morphic Style Badge */}
      <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium tracking-widest text-slate-300 uppercase mb-8 hover:bg-white/10 transition-colors cursor-pointer hover:border-violet-500/50">
        HYPERKIT AI BUILDER v1.0
      </div>
      
      <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 relative z-10 leading-[1.15]">
        Build production apps with AI. <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-white to-violet-400 glow-text">No code required.</span>
      </h1>
      
      <p className="text-lg text-slate-400 mb-12 max-w-2xl font-light leading-relaxed">
        Use AI to generate data models, UIs, and workflows, then customize everything in a visual builder—without touching code.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-16">
        <a
          href="/overview" 
          className="h-12 px-8 btn-primary text-white rounded-full font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2 hover:scale-105"
        >
          Start Building Free
        </a>

        <a
          href="/watch-demo" 
          className="h-12 px-8 bg-transparent border border-white/20 hover:border-violet-400 hover:bg-white/5 text-white rounded-full font-medium text-sm tracking-wide transition-all flex items-center gap-2 group"
        >
          Watch Demo
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      
      {/* Product UI Visualization */}
      <ProductUIDemo />
    </div>
  );
};

const ProductUIDemo: React.FC = () => {
  return (
    <div className="w-full max-w-5xl relative group perspective-1000">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-t from-violet-600/20 via-indigo-600/10 to-transparent rounded-[2rem] blur-2xl opacity-60"></div>
      
      <div className="relative bg-[#08080c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
        {/* App Header */}
        <div className="h-14 border-b border-white/5 bg-[#08080c] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Circle className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-medium text-white">Hyperkit</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-400 font-medium ml-2">Pro</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="hover:text-white cursor-pointer">Docs</span>
            <span className="hover:text-white cursor-pointer">Feedback</span>
            <Sun className="w-4 h-4 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* UI Content */}
        <div className="flex h-[450px] md:h-[550px] bg-[#050508]">
          <Sidebar />
          <Canvas />
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 border-r border-white/5 bg-[#050508] p-5 hidden md:flex flex-col">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-6 uppercase tracking-wider">
        <span>Projects</span>
        <ChevronRight className="w-3 h-3 rotate-180" />
      </div>
      
      <div className="space-y-1">
        <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
          <div className="text-xs text-violet-300 font-medium mb-1">Active Project</div>
          <div className="text-sm text-white">CRM Dashboard</div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Database
            </div>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
              API Routes
            </div>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
              Workflows
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex items-center gap-3 text-sm text-slate-500 hover:text-white cursor-pointer transition-colors">
          <Circle className="w-4 h-4" /> Documents
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 hover:text-white cursor-pointer transition-colors">
          <Circle className="w-4 h-4" /> Search
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 hover:text-white cursor-pointer transition-colors">
          <Circle className="w-4 h-4" /> Chat
        </div>
      </div>
    </div>
  );
};

const Canvas: React.FC = () => {
  return (
    <div className="flex-1 bg-[#050508] relative overflow-hidden flex flex-col">
      {/* Input Area */}
      <div className="p-6">
        <div className="w-full bg-[#0A0A0E] border border-white/5 rounded-xl p-1 shadow-lg">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-slate-400">Describe your app requirement...</span>
            <button className="text-xs bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded transition-colors">
              Generate
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 px-8 pb-8 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg text-slate-200 font-medium mb-2">Generating Data Schema</h3>
            <p className="text-xs text-slate-500 font-mono mb-4">base44_schema_v2.json</p>
            <div className="p-5 rounded-lg bg-[#0A0A0E] border border-white/5 text-sm text-slate-400 font-mono leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-violet-500"></div>
              <span className="text-violet-400">const</span> UserSchema = {'{'}<br />
              &nbsp;&nbsp;id: <span className="text-green-400">UUID</span>,<br />
              &nbsp;&nbsp;email: <span className="text-green-400">String</span>,<br />
              &nbsp;&nbsp;role: <span className="text-green-400">Enum</span>(['admin', 'user']),<br />
              &nbsp;&nbsp;created_at: <span className="text-green-400">Timestamp</span><br />
              {'}'}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg text-slate-200 font-medium mb-2">UI Component Preview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded-lg bg-[#0A0A0E] border border-white/5 p-4 flex flex-col justify-between group hover:border-violet-500/30 transition-colors">
                <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-violet-400" />
                </div>
                <div className="w-16 h-2 bg-white/10 rounded"></div>
              </div>
              <div className="h-24 rounded-lg bg-[#0A0A0E] border border-white/5 p-4 flex flex-col justify-between group hover:border-violet-500/30 transition-colors">
                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-green-400" />
                </div>
                <div className="w-16 h-2 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;