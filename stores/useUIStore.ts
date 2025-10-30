import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export type ViewMode = 'dashboard' | 'preview';
export type PreviewMode = 'desktop' | 'mobile';
export type DashboardTab = 
  | 'Overview' 
  | 'Users' 
  | 'Data' 
  | 'Analytics' 
  | 'Domains' 
  | 'Security' 
  | 'Code' 
  | 'Agents' 
  | 'Logs' 
  | 'API' 
  | 'Settings';

interface UIStore {
  // Sidebar state
  sidebarWidth: number;
  isSidebarMinimized: boolean;
  isMobileSidebarOpen: boolean;
  
  // View mode state
  viewMode: ViewMode;
  previewMode: PreviewMode;
  dashboardTab: DashboardTab;
  
  // Right panel state (placeholder for future)
  isRightPanelOpen: boolean;
  rightPanelWidth: number;
  
  // Actions
  setSidebarWidth: (width: number) => void;
  toggleSidebarMinimize: () => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setDashboardTab: (tab: DashboardTab) => void;
}

const SIDEBAR_WIDTH_MIN = 320; // 20rem
const SIDEBAR_WIDTH_DEFAULT = 320; // 20rem
const SIDEBAR_WIDTH_MAX = 384; // 24rem
const PANEL_WIDTH_DEFAULT = 320; // 20rem

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // Initial state
      sidebarWidth: SIDEBAR_WIDTH_DEFAULT,
      isSidebarMinimized: false,
      isMobileSidebarOpen: false,
      viewMode: 'dashboard',
      previewMode: 'desktop',
      dashboardTab: 'Overview',
      isRightPanelOpen: false,
      rightPanelWidth: PANEL_WIDTH_DEFAULT,
      
      // Sidebar actions
      setSidebarWidth: (width) =>
        set({
          sidebarWidth: Math.max(
            SIDEBAR_WIDTH_MIN,
            Math.min(width, SIDEBAR_WIDTH_MAX)
          ),
        }),
      
      toggleSidebarMinimize: () =>
        set((state) => ({
          isSidebarMinimized: !state.isSidebarMinimized,
        })),
      
      setMobileSidebarOpen: (isOpen) =>
        set({ isMobileSidebarOpen: isOpen }),
      
      // View mode actions
      setViewMode: (mode) =>
        set({ viewMode: mode }),
      
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === 'dashboard' ? 'preview' : 'dashboard',
        })),
      
      setPreviewMode: (mode) =>
        set({ previewMode: mode }),
      
      setDashboardTab: (tab) =>
        set({ dashboardTab: tab }),
    }),
    {
      name: 'hyperkit-ui',
      partialize: (state) => ({
        sidebarWidth: state.sidebarWidth,
        isSidebarMinimized: state.isSidebarMinimized,
        viewMode: state.viewMode,
        previewMode: state.previewMode,
        dashboardTab: state.dashboardTab,
      }),
    }
  )
);

// Export constants
export { SIDEBAR_WIDTH_MIN, SIDEBAR_WIDTH_DEFAULT, SIDEBAR_WIDTH_MAX, PANEL_WIDTH_DEFAULT };
