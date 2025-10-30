'use client';

import { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useChatStore } from '@/stores/useChatStore';
import { useUIStore } from '@/stores/useUIStore';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Preview } from '@/components/preview/Preview';

export default function Home() {
  const { chats } = useChatStore();
  const { viewMode } = useUIStore();

  // Initialize with single chat if none exists
  useEffect(() => {
    if (chats.length === 0) {
      useChatStore.getState().createChat();
    }
  }, []);

  return (
    <AppLayout>
        <>
          {viewMode === 'dashboard' && <Dashboard />}
          {viewMode === 'preview' && <Preview />}
        </>
    </AppLayout>
  );
}
