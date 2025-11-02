'use client';

import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { RightPanel } from './RightPanel';
import { ThemeToggle } from './ThemeToggle';
import { useUIStore } from '@/stores/useUIStore';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { 
    setMobileSidebarOpen, 
    toggleSidebarMinimize, 
    isSidebarMinimized,
    sidebarWidth,
    viewMode,
    toggleViewMode,
    previewMode,
    setPreviewMode
  } = useUIStore();
  const isMobile = useIsMobile();

  // Calculate header left width based on sidebar state
  const headerLeftWidth = isMobile ? '0px' : (isSidebarMinimized ? '0px' : `${sidebarWidth}px`);

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="app-header">
        {/* Left section - above sidebar (desktop only) */}
        {!isMobile && !isSidebarMinimized && (
          <div 
            className="header-section header-section-left"
            style={{ width: headerLeftWidth }}
          > 
            <div className="logo">
              <span className="logo-text">HyperkitAI</span>
            </div>
          </div>
        )}
        
        {/* Mobile logo */}
        {isMobile && (
          <div className="header-section header-section-left mobile-header-left">
            <div className="logo">
              <span className="logo-text">HyperkitAI</span>
            </div>
          </div>
        )}
        
        {/* Right section - above main content */}
        <div className="header-section header-section-right">
          {/* Controls container */}
          <div className={`flex justify-start gap-2 items-center ${isMobile ? 'flex-nowrap overflow-x-auto' : 'flex-wrap'}`}>
            {/* Sidebar toggle button - Desktop only */}
            {!isMobile && (
              <button
                onClick={toggleSidebarMinimize}
                className="sidebar-toggle-btn-header"
                aria-label={isSidebarMinimized ? 'Show sidebar' : 'Hide sidebar'}
                title={isSidebarMinimized ? 'Show sidebar' : 'Hide sidebar'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </button>
            )}
            
            {/* View Mode Toggle - Now shown on both mobile and desktop */}
            <div className={`view-mode-toggle ${isMobile ? 'view-mode-toggle-mobile' : ''}`}>
              <button
                onClick={() => toggleViewMode()}
                className={`view-mode-tab ${viewMode === 'dashboard' ? 'active' : ''}`}
              >
                {isMobile ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                ) : (
                  'Dashboard'
                )}
              </button>
              <button
                onClick={() => toggleViewMode()}
                className={`view-mode-tab ${viewMode === 'preview' ? 'active' : ''}`}
              >
                {isMobile ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  'Preview'
                )}
              </button>
            </div>

            {/* Preview Mode Toggle - shown when in preview mode on both mobile and desktop */}
            {viewMode === 'preview' && (
              <div className="preview-mode-toggle">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`preview-mode-tab ${previewMode === 'desktop' ? 'active' : ''}`}
                  aria-label="Desktop mode"
                  title="Desktop mode"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`preview-mode-tab ${previewMode === 'mobile' ? 'active' : ''}`}
                  aria-label="Mobile mode"
                  title="Mobile mode"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Main Layout */}
      <div className="app-body">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>

      {/* Mobile chat button */}
      {isMobile && (
        <button
          className="mobile-chat-button"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}