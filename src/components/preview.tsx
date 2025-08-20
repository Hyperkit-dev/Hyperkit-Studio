'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/store';
import { FileService } from '@/lib/file-service';
import { DEFAULT_PROJECT_TEMPLATE } from '@/constants';

interface PreviewPanelProps {}

export const PreviewPanel: React.FC<PreviewPanelProps> = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const { currentProject, setError } = useAppStore();

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Enhanced security: verify origin and message structure
      const allowedOrigins = [
        window.location.origin,
        'http://localhost:3000',
        'https://hyperionkit.xyz',
        'https://ai.hyperionkit.xyz',
        'https://ai-lilac-alpha.vercel.app'
      ];
      
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('Blocked message from unauthorized origin:', event.origin);
        return;
      }
      
      if (event.data.type === 'PREVIEW_READY') {
        setPreviewReady(true);
        updateIframeContent();
      }
      
      // Handle security alerts from iframe
      if (event.data.type === 'SECURITY_ALERT') {
        console.warn('Security alert from preview:', event.data.message);
        setError('Security restriction detected in preview');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentProject]);

  // Enhanced content sanitization
  const sanitizeContent = (html: string) => {
    if (!html) return '';
    
    let sanitized = html;
    
    // Remove dangerous script patterns but preserve Web3 functionality
    const dangerousPatterns = [
      /document\.domain\s*=/gi,
      /eval\s*\(/gi,
      /Function\s*\(/gi,
      /setTimeout\s*\(\s*["'].*?["']/gi, // String-based setTimeout
      /setInterval\s*\(\s*["'].*?["']/gi, // String-based setInterval
      /<iframe[^>]*>/gi, // Nested iframes
      /<object[^>]*>/gi, // Object embeds
      /<embed[^>]*>/gi, // Embed tags
    ];
    
    dangerousPatterns.forEach(pattern => {
      if (pattern.test(sanitized)) {
        console.warn('Removed potentially dangerous content pattern');
        sanitized = sanitized.replace(pattern, '/* REMOVED_FOR_SECURITY */');
      }
    });
    
    return sanitized;
  };

  // Update iframe content safely
  const updateIframeContent = () => {
    if (!currentProject || !iframeRef.current || !previewReady) return;
    
    const sanitizedContent = sanitizeContent(currentProject.htmlContent);
    
    iframeRef.current.contentWindow?.postMessage({
      type: 'UPDATE_CONTENT',
      content: sanitizedContent,
      timestamp: Date.now(),
      securityLevel: 'enhanced'
    }, window.location.origin);
  };

  // Update content when project changes
  useEffect(() => {
    if (previewReady) {
      updateIframeContent();
    }
  }, [currentProject?.htmlContent, previewReady]);

  const handleDownload = () => {
    if (!currentProject) return;
    
    try {
      FileService.downloadProject(currentProject);
    } catch (error) {
      setError('Failed to download project');
    }
  };

  const handlePublish = async () => {
    if (!currentProject) return;
    
    try {
      setIsPublishing(true);
      const result = await FileService.publishProject(currentProject);
      
      if (result.success) {
        setPublishSuccess(true);
        setTimeout(() => {
          // Redirect to projects page
          window.open('https://hyperionkit.xyz/projects', '_blank');
          setPublishSuccess(false);
        }, 2000);
      } else {
        setError('Failed to publish project');
      }
    } catch (error) {
      setError('Failed to publish project');
    } finally {
      setIsPublishing(false);
    }
  };

  const renderFileStructure = () => {
    if (!currentProject) return null;

    return (
      <div className="space-y-2">
        {currentProject.files.map((file, index) => (
          <div key={index} className="bg-gray-800 rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white">{file.path}</h4>
              <span className="text-xs text-gray-400">{file.type}</span>
            </div>
            <pre className="text-xs text-gray-300 overflow-x-auto bg-gray-900 p-2 rounded">
              {file.content.slice(0, 200)}
              {file.content.length > 200 && '...'}
            </pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Project Preview</h2>
          
          {currentProject && (
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-sm rounded ${
                  activeTab === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 text-sm rounded ${
                  activeTab === 'code'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!currentProject ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="text-gray-500">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No Project Yet</h3>
              <p className="text-sm">
                Describe your Web3 project in the chat to see the preview here.
              </p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'preview' ? (
              <div className="h-full p-4">
                <iframe
                  ref={iframeRef}
                  src="/preview-template.html"
                  className="w-full h-full border border-gray-800 rounded-lg bg-white"
                  title="Project Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  allow="clipboard-read; clipboard-write"
                />
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-4 scrollbar-transparent">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Project Files</h3>
                  {renderFileStructure()}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      {currentProject && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex space-x-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Download
            </button>
            
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {isPublishing ? 'Publishing...' : publishSuccess ? 'Published!' : 'Publish'}
            </button>
          </div>
          
          {publishSuccess && (
            <div className="mt-3 p-3 bg-green-900 border border-green-800 rounded-lg">
              <p className="text-green-300 text-sm text-center">
                Project published successfully! Redirecting to projects page...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
