"use client";

import Image from "next/image";
import { Twitter, Github, Disc } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 pt-16 pb-8 bg-[#02010a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-auto flex items-center">
                <Image
                  src="/hyperkit/hyperkit-header-white.svg"
                  alt="Hyperkit Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mb-6">
              The complete developer platform for building, testing, and deploying AI-powered Web3 applications.
            </p>
            <div className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Disc className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium text-xs mb-1">Product</h4>
            <a href="#" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Studio
            </a>
            <a href="#" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Agents
            </a>
            <a href="#" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Security
            </a>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium text-xs mb-1">Resources</h4>
            <a href="#" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Documentation
            </a>
            <a href="#" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              API Reference
            </a>
            <a href="#" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Community
            </a>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium text-xs mb-1">Company</h4>
            <a href="/foundation" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              About
            </a>
            <a href="/legal" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Careers
            </a>
            <a href="/legal" className="text-slate-500 text-xs hover:text-brand-400 transition-colors">
              Legal
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-[10px]">
            © {currentYear} Hyperkit Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
            <span className="text-slate-500 text-[10px] font-mono">All Systems Normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}