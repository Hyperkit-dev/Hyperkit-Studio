/**
 * AI Store - Manages conversation state, generated projects, and AI interactions
 * Uses Zustand with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================================================
// Types
// ============================================================================

export type ConversationStep =
  | 'welcome'
  | 'project-type'
  | 'project-details'
  | 'complexity-choice'
  | 'generating'
  | 'complete'
  | 'error';

export interface ProjectRequirements {
  type?: string; // 'blockchain', 'landing', 'dashboard', 'custom'
  title?: string;
  description?: string;
  isDynamic?: boolean; // true = dynamic (more tokens), false = static (fewer tokens)
  features?: string[];
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface GeneratedProject {
  id: string;
  requirements: ProjectRequirements;
  code: string;
  createdAt: number;
  bundledCode?: string; // Set after bundling
  error?: string;
}

export type AIModel = 'gpt-4o' | 'gpt-5' | 'phi-4' | 'deepseek-r1' | 'grok-3';

export interface AIModelInfo {
  id: AIModel;
  name: string;
  description: string;
  githubModel: string;
}

export const AI_MODELS: Record<AIModel, AIModelInfo> = {
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'HyperKit v2',
    description: 'GPT-4o - Balanced performance',
    githubModel: 'gpt-4o'
  },
  'gpt-5': {
    id: 'gpt-5',
    name: 'HyperKit v3',
    description: 'GPT-5 - Most advanced',
    githubModel: 'gpt-4o' // Fallback to gpt-4o until gpt-5 is available
  },
  'phi-4': {
    id: 'phi-4',
    name: 'HyperKit v1',
    description: 'Phi-4 - Fast and efficient',
    githubModel: 'Phi-4'
  },
  'deepseek-r1': {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    description: 'DeepSeek - Reasoning focused',
    githubModel: 'DeepSeek-R1'
  },
  'grok-3': {
    id: 'grok-3',
    name: 'Grok 3',
    description: 'Grok - Creative responses',
    githubModel: 'grok-3'
  }
};

// ============================================================================
// Store Interface
// ============================================================================

interface AIState {
  // Conversation state
  currentStep: ConversationStep;
  messages: AIMessage[];
  isStreaming: boolean;
  streamingContent: string;
  
  // Project requirements being built
  currentRequirements: ProjectRequirements;
  
  // Generated projects
  projects: GeneratedProject[];
  currentProjectId: string | null;
  
  // Error handling
  error: string | null;
  retryCount: number;
  
  // API configuration
  apiKey: string | null;
  selectedModel: AIModel;
}

interface AIActions {
  // Conversation management
  setStep: (step: ConversationStep) => void;
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  
  // Streaming
  setStreaming: (isStreaming: boolean) => void;
  appendStreamingContent: (content: string) => void;
  finalizeStreamingMessage: () => void;
  
  // Requirements
  updateRequirements: (updates: Partial<ProjectRequirements>) => void;
  clearRequirements: () => void;
  
  // Projects
  createProject: (code: string) => string; // Returns project ID
  updateProject: (id: string, updates: Partial<GeneratedProject>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string | null) => void;
  getCurrentProject: () => GeneratedProject | null;
  
  // Error handling
  setError: (error: string | null) => void;
  incrementRetry: () => void;
  resetRetry: () => void;
  
  // API & Model
  setAPIKey: (key: string) => void;
  setSelectedModel: (model: AIModel) => void;
  
  // Reset
  reset: () => void;
}

type AIStore = AIState & AIActions;

// ============================================================================
// Initial State
// ============================================================================

const initialState: AIState = {
  currentStep: 'welcome',
  messages: [],
  isStreaming: false,
  streamingContent: '',
  currentRequirements: {},
  projects: [],
  currentProjectId: null,
  error: null,
  retryCount: 0,
  apiKey: null,
  selectedModel: 'gpt-4o', // Default model
};

// ============================================================================
// Store Implementation
// ============================================================================

export const useAIStore = create<AIStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Conversation management
      setStep: (step) => set({ currentStep: step, error: null }),

      addMessage: (message) => {
        const newMessage: AIMessage = {
          ...message,
          id: Math.random().toString(36).substring(2, 11),
          timestamp: Date.now(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      clearMessages: () => set({ messages: [] }),

      // Streaming
      setStreaming: (isStreaming) => {
        if (isStreaming) {
          set({ isStreaming, streamingContent: '' });
        } else {
          set({ isStreaming });
        }
      },

      appendStreamingContent: (content) => {
        set((state) => ({
          streamingContent: state.streamingContent + content,
        }));
      },

      finalizeStreamingMessage: () => {
        const { streamingContent } = get();
        if (streamingContent) {
          get().addMessage({
            role: 'assistant',
            content: streamingContent,
          });
        }
        set({ streamingContent: '', isStreaming: false });
      },

      // Requirements
      updateRequirements: (updates) => {
        set((state) => ({
          currentRequirements: {
            ...state.currentRequirements,
            ...updates,
          },
        }));
      },

      clearRequirements: () => set({ currentRequirements: {} }),

      // Projects
      createProject: (code) => {
        const { currentRequirements } = get();
        const projectId = `project-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        
        const newProject: GeneratedProject = {
          id: projectId,
          requirements: { ...currentRequirements },
          code,
          createdAt: Date.now(),
        };

        // Keep only the latest project to save localStorage space
        // Delete all previous projects
        set({
          projects: [newProject],
          currentProjectId: projectId,
        });

        console.log('✓ Created new project and cleared previous projects from storage');

        return projectId;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
        }));
      },

      setCurrentProject: (id) => set({ currentProjectId: id }),

      getCurrentProject: () => {
        const { projects, currentProjectId } = get();
        return projects.find((p) => p.id === currentProjectId) || null;
      },

      // Error handling
      setError: (error) => set({ error, currentStep: error ? 'error' : get().currentStep }),

      incrementRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),

      resetRetry: () => set({ retryCount: 0 }),

      // API & Model
      setAPIKey: (key) => set({ apiKey: key }),

      setSelectedModel: (model) => set({ selectedModel: model }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'ai-store',
      partialize: (state) => ({
        // Only persist these fields
        projects: state.projects,
        currentProjectId: state.currentProjectId,
        apiKey: state.apiKey,
        selectedModel: state.selectedModel,
      }),
    }
  )
);

// ============================================================================
// Selectors (for performance optimization)
// ============================================================================

export const selectCurrentProject = (state: AIStore) => state.getCurrentProject();
export const selectIsGenerating = (state: AIStore) => state.currentStep === 'generating';
export const selectHasError = (state: AIStore) => !!state.error;
export const selectCanRetry = (state: AIStore) => state.retryCount < 3;
