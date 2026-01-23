import React from 'react';
import { BaseLayout } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/landing-hero-section';
import { PainVsTransformation } from '@/components/landing/landing-pain-v-transformation';
import { HowItWorks } from '@/components/landing/landing-how-it-works';
import { FeatureHighlights } from '@/components/landing/landing-feature-highlights';
import { TemplatesSection } from '@/components/landing/landing-templates-section';
import { PricingSection } from '@/components/landing/landing-pricing-section';
import { FAQSection } from '@/components/landing/landing-faq-section';
import { FinalCTA } from '@/components/landing/landing-final-cta';
import Footer from '@/components/landing/landing-footer';

export const Base44Landing: React.FC = () => {
  return (
    <BaseLayout>
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <HeroSection />
        <PainVsTransformation />
        <HowItWorks />
        <FeatureHighlights />
        <TemplatesSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </BaseLayout>
  );
};

export default Base44Landing;