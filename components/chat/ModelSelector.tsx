'use client';

import { useAIStore, AI_MODELS, type AIModel } from '@/stores/useAIStore';
import { useState, useRef, useEffect } from 'react';

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useAIStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentModel = AI_MODELS[selectedModel];

  return (
    <div className="model-selector" ref={dropdownRef}>
      <button
        className="model-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Select AI Model"
      >
        <span className="model-selector-label">{currentModel.name}</span>
        <span className="model-selector-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="model-selector-dropdown">
          {(Object.keys(AI_MODELS) as AIModel[]).map((modelId) => {
            const model = AI_MODELS[modelId];
            const isSelected = selectedModel === modelId;

            return (
              <button
                key={modelId}
                className={`model-option ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedModel(modelId);
                  setIsOpen(false);
                }}
              >
                <div className="model-option-content">
                  <div className="model-option-header">
                    <span className="model-option-name">{model.name}</span>
                    {isSelected && <span className="model-option-check">✓</span>}
                  </div>
                  <div className="model-option-description">{model.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
