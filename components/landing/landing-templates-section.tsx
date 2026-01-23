import React from 'react';
import { ArrowRight } from 'lucide-react';

export const TemplatesSection: React.FC = () => {
  return (
    <div id="templates" className="mb-32 scroll-mt-20">
      <h2 className="text-3xl font-medium tracking-tight text-white mb-3">
        Start from a template
      </h2>
      <p className="text-slate-400 mb-12">Don't start from scratch. Fork a production-ready app.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TemplateCard
          title="Modern CRM"
          description="Customer management with kanban boards."
          badge="SAAS"
        />
        <TemplateCard
          title="AI Agent Dashboard"
          description="Chat interface with vector database setup."
          badge="AI"
        />
        <TemplateCard
          title="Admin Portal"
          description="Data tables, role-based access control."
          badge="INTERNAL"
        />
      </div>
    </div>
  );
};

interface TemplateCardProps {
  title: string;
  description: string;
  badge: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, badge }) => {
  return (
    <div className="group border border-white/5 bg-[#08080c] rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
      <div className="h-40 bg-gradient-to-br from-[#111] to-black relative">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/40 backdrop-blur rounded-full text-[10px] font-medium text-slate-300 border border-white/10">
          {badge}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-medium text-white mb-2 text-lg">{title}</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
        <a href="#" className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">
          Preview <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default TemplatesSection;