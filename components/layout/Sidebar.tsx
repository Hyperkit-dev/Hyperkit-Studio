'use client';

import { useEffect, useMemo } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useResizable } from '@/hooks/useResizable';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { ChatHistory } from '@/components/chat/ChatHistory';

interface SidebarProps {
  children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const {
    sidebarWidth,
    isSidebarMinimized,
    isMobileSidebarOpen,
    setSidebarWidth,
    toggleSidebarMinimize,
    setMobileSidebarOpen,
  } = useUIStore();

  const isMobile = useIsMobile();

  // Calculate max width as 25% of window width
  const maxWidth = useMemo(() => {
    if (typeof window === 'undefined') return 384;
    return Math.floor(window.innerWidth * 0.25);
  }, []);

  const { width, handleMouseDown, isResizing } = useResizable({
    initialWidth: sidebarWidth,
    minWidth: 48,
    maxWidth,
    onResize: setSidebarWidth,
  });

  // Sync width to store on mount and when width changes
  useEffect(() => {
    if (!isResizing) {
      setSidebarWidth(width);
    }
  }, [width, isResizing, setSidebarWidth]);

  // Mobile: Show modal overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile sidebar modal */}
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="sidebar-backdrop"
              onClick={() => setMobileSidebarOpen(false)}
            />
            
            {/* Modal */}
            <div className="sidebar-modal">
              <div className="sidebar-modal-header">
                <h2>Sessions</h2>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="sidebar-modal-close"
                  aria-label="Close sidebar"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="sidebar-modal-content">
                {children || <ChatHistory />}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop: Resizable sidebar
  const displayWidth = isSidebarMinimized ? 0 : width;

  return (
    <aside
      className="sidebar"
      style={{ width: `${displayWidth}px` }}
    >
      {!isSidebarMinimized && (
        <>
          <div className="sidebar-content">
            <div className="sidebar-body">
              {children || <ChatHistory />}
            </div>
          </div>

          {/* Resize handle */}
          <div
            className="sidebar-resize-handle"
            onMouseDown={handleMouseDown}
            aria-label="Resize sidebar"
          />
        </>
      )}
    </aside>
  );
}
