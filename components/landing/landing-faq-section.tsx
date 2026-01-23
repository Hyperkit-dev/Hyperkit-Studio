"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mb-32">
      <h2 className="text-3xl font-medium tracking-tight text-white mb-10 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        <FAQItem
          question="Do I need to know how to code?"
          answer="No. You can build complex applications using just our visual interface and AI prompts. However, if you are a developer, you can export the code and extend it."
        />
        <FAQItem
          question="Can I export the code?"
          answer="Yes! On the Pro plan and above, you can export clean, production-ready React and Node.js code at any time. You own your IP."
        />
        <FAQItem
          question="How does hosting work?"
          answer="Hyperkit provides one-click deployment to our global edge network. Your apps are fast, secure, and scalable by default."
        />
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`bg-white/5 border border-white/5 rounded-xl transition-colors duration-300 ${
        isOpen ? 'bg-white/[0.07]' : ''
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer p-5 text-sm font-medium text-slate-200 w-full text-left"
      >
        {question}
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      {isOpen && (
        <div className="text-slate-400 text-sm px-5 pb-5 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQSection;