"use client";

import React, { useState } from 'react';
import { Navbar } from "@/components/layout/navbar";
import { AppHeader } from '@/components/pages/code-app-header';
import { LeftSidebar } from '@/components/pages/code-left-sidebar';
import { WorkspaceMain } from '@/components/pages/code-main-page';
import { RightChatPanel } from '@/components/pages/code-right-panel';
import { Toast } from '@/components/ui/toast';

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="bg-[#050505] text-[#e1e1e3] h-screen w-full flex flex-col overflow-hidden text-[13px] selection:bg-indigo-500/30">
        <Navbar />
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        <LeftSidebar />
        <WorkspaceMain showToast={showToast} />
        <RightChatPanel showToast={showToast} />
      </div>

      <Toast visible={toastVisible} message={toastMessage} />
    </div>
  );
}