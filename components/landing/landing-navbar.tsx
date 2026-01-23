'use client';

import React from 'react';
import { Circle } from 'lucide-react';
import Image from 'next/image';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }

        .bg-cosmos {
          background-color: #020205;
        }

        .light-flare {
          background: radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.4) 0%, rgba(76, 29, 149, 0.1) 50%, transparent 80%);
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 0;
        }

        .grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
        }

        .glass-card {
          background: rgba(10, 10, 16, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(139, 92, 246, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
        }
      `}</style>

      <div className="bg-cosmos text-slate-300 antialiased relative min-h-screen selection:bg-violet-500/30 selection:text-violet-100 overflow-x-hidden font-sans">
        <div className="light-flare"></div>

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 grid-pattern opacity-40"></div>
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        </div>

        <Navigation />
        {children}
      </div>
    </>
  );
};

const Navigation: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 80; // sticky navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const link = (id: string, label: string) => (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(id);
      }}
      className="text-sm font-medium text-slate-400 hover:text-violet-300 transition-colors cursor-pointer"
    >
      {label}
    </a>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020205]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
            <a
            href="#hero"
            onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
            }}
            className="flex items-center gap-3 group"
            >
            <div className="relative w-24 h-24">
                <Image
                src="/hyperkit/hyperkit-header-white.svg" // make sure your logo is in the public folder
                alt="Hyperkit Logo"
                fill
                className="object-contain"
                />
            </div>
            </a>

          <div className="hidden md:flex items-center gap-8 pl-4">
            {link('features', 'Product')}
            {link('templates', 'Solutions')}
            {link('how-it-works', 'Docs')}
            {link('pricing', 'Pricing')}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
            Sign in
          </a>
        <a
          href="/overview" 
          className="h-12 px-8 btn-primary text-white rounded-full font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2 hover:scale-105"
        >
          Start Free
        </a>
        </div>
      </div>
    </nav>
  );
};

export default BaseLayout;
