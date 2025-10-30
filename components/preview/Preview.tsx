'use client';

import { useState, useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAIStore } from '@/stores/useAIStore';
import { PreviewFrame } from './PreviewFrame';
import { bundleCode } from '@/lib/bundler';
import { generateSkeleton } from '@/lib/skeleton';
import { ConnectWallet } from 'hyperionkit';

export function Preview() {
  const { previewMode } = useUIStore();
  const { projects, currentProjectId } = useAIStore();
  const [bundledCode, setBundledCode] = useState<string>('');
  const [bundleError, setBundleError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  // Get current AI project if exists
  const currentProject = projects.find(p => p.id === currentProjectId);

  // Bundle the code when component mounts, prompt changes, or project updates
  useEffect(() => {
    const bundle = async () => {
      // If we have an AI-generated project, bundle it
      if (currentProject && currentProject.code) {
        setIsLoading(true);
        setBundleError('');
        
        try {
          console.log('Using AI-generated code from project:', currentProject.id);
          setCurrentPrompt(currentProject.requirements.title || 'AI Generated Project');
          
          console.log('Bundling code...');
          const result = await bundleCode(currentProject.code);
          
          if (result.error) {
            throw new Error(result.error);
          }
          
          console.log('Bundle successful!');
          setBundledCode(result.code);
          
          // Update project with bundled code
          const updateProject = useAIStore.getState().updateProject;
          updateProject(currentProject.id, { bundledCode: result.code });
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown bundling error';
          console.error('Bundle error:', errorMsg);
          setBundleError(errorMsg);
        } finally {
          setIsLoading(false);
        }
      } else {
        // No project yet - show empty state
        console.log('No AI project available yet');
        setBundledCode('');
        setBundleError('');
        setCurrentPrompt('');
        setIsLoading(false);
      }
    };

    bundle();
  }, [currentProject?.id, currentProject?.code]);

  return (
    <div className="preview">
      {/* Preview Layout */}
      <div className="preview-layout-single">
        {/* Preview Output */}
        <div className="preview-output-panel">
          <div className="preview-content">
            {isLoading ? (
              <div className="preview-loading">
                <div className="preview-loading-spinner"></div>
                <p>Bundling code with esbuild-wasm...</p>
              </div>
            ) : !bundledCode && !bundleError ? (
              /* Empty State - No Project Yet */
              <div className="preview-empty-state">
                <div className="preview-empty-content">
                  <div className="preview-empty-icon">💬</div>
                  <h2>No Project Yet</h2>
                  <p>Start a conversation in the sidebar to generate your first project!</p>
                </div>
              </div>
            ) : (
              <div 
                className={`preview-frame ${
                  previewMode === 'mobile' ? 'preview-frame-mobile' : 'preview-frame-desktop'
                }`}
                style={{ position: 'relative' }}
              >
                {/* ConnectWallet positioned absolutely within preview frame */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '5px',
                  zIndex: 9999,
                  transform: 'scale(0.7)'
                }}>
                  <ConnectWallet />
                </div>
                <PreviewFrame 
                  code={bundledCode}
                  bundleError={bundleError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
