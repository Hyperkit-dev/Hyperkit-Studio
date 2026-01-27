import React from 'react';
import { Loader2 } from 'lucide-react';

interface ToastProps {
  visible: boolean;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ visible, message }) => {
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2.5 rounded-full shadow-2xl z-[100] flex items-center gap-3 font-medium text-xs transform transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-24'
      }`}
    >
      <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
      <span>{message}</span>
    </div>
  );
};