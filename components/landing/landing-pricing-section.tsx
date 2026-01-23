import React from 'react';
import { Check } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <div id="pricing" className="mb-32 scroll-mt-20">
      <h2 className="text-3xl font-medium tracking-tight text-white mb-16 text-center">
        Fair pricing for every stage
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <PricingCard
          title="Hobby"
          price="$0"
          features={[
            '1 Project',
            'Community Support',
            'Base44 branding'
          ]}
          buttonText="Start Free"
          buttonStyle="secondary"
        />

        <PricingCard
          title="Pro"
          price="$29"
          features={[
            'Unlimited Projects',
            'Custom Domains',
            'AI Code Export'
          ]}
          buttonText="Get Started"
          buttonStyle="primary"
          isPopular
        />

        <PricingCard
          title="Team"
          price="$99"
          features={[
            'SSO & Roles',
            'Priority Support',
            'Audit Logs'
          ]}
          buttonText="Contact Sales"
          buttonStyle="secondary"
        />
      </div>
    </div>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonStyle: 'primary' | 'secondary';
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  buttonText,
  buttonStyle,
  isPopular = false
}) => {
  const cardClasses = isPopular
    ? 'p-8 rounded-2xl border border-violet-500/30 bg-[#0a0a10] relative shadow-[0_0_40px_rgba(124,58,237,0.15)] transform scale-105 z-10'
    : 'p-8 rounded-2xl border border-white/5 bg-[#08080c] hover:bg-[#0a0a10] transition-colors';

  const buttonClasses = buttonStyle === 'primary'
    ? 'w-full py-3 rounded-full btn-primary text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all'
    : 'w-full py-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors uppercase tracking-wider';

  return (
    <div className={cardClasses}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl">
          POPULAR
        </div>
      )}
      <h3 className="font-medium text-white mb-2">{title}</h3>
      <div className="text-4xl font-bold text-white mb-6">
        {price} <span className="text-sm font-normal text-slate-500">/mo</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center gap-3 text-sm ${isPopular ? 'text-slate-300' : 'text-slate-400'}`}>
            <Check className="w-4 h-4 text-violet-400" /> {feature}
          </li>
        ))}
      </ul>
      <button className={buttonClasses}>{buttonText}</button>
    </div>
  );
};

export default PricingSection;