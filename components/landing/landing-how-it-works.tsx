import React from 'react';
import { MessageSquare, Wand2, Globe } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div id="how-it-works" className="mb-32 scroll-mt-20">
      <h2 className="text-3xl font-medium tracking-tight text-white text-center mb-16">
        Ship in 3 simple steps
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <StepCard
          icon={<MessageSquare className="w-6 h-6 text-violet-300" />}
          number="1"
          title="Describe your app"
          description="Tell the AI what you want to build in plain English. No complex syntax or PRDs required."
          iconBgColor="bg-violet-500/10"
          iconBgHoverColor="group-hover:bg-violet-500/20"
        />

        <StepCard
          icon={<Wand2 className="w-6 h-6 text-indigo-300" />}
          number="2"
          title="AI generates logic"
          description="Our engine builds the database schema, API endpoints, and frontend UI instantly."
          iconBgColor="bg-indigo-500/10"
          iconBgHoverColor="group-hover:bg-indigo-500/20"
        />

        <StepCard
          icon={<Globe className="w-6 h-6 text-purple-300" />}
          number="3"
          title="Publish & Share"
          description="Deploy to a global edge network in one click. Export clean React code if you need to."
          iconBgColor="bg-purple-500/10"
          iconBgHoverColor="group-hover:bg-purple-500/20"
        />
      </div>
    </div>
  );
};

interface StepCardProps {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  iconBgColor: string;
  iconBgHoverColor: string;
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  number,
  title,
  description,
  iconBgColor,
  iconBgHoverColor
}) => {
  return (
    <div className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
      <div className={`mb-6 w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center ${iconBgHoverColor} transition-colors`}>
        {icon}
      </div>
      <h3 className="text-lg text-white font-medium mb-3">{number}. {title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
};

export default HowItWorks;