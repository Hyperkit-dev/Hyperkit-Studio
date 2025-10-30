'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/stores/useChatStore';
import { useAIStore } from '@/stores/useAIStore';
import { getConversationFlow } from '@/lib/ai/conversation-flow';
import { ModelSelector } from './ModelSelector';

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, createChat, activeChat, chats } = useChatStore();
  const { currentStep, addMessage: addAIMessage, isStreaming } = useAIStore();

  // Auto-create a single chat if none exists
  useEffect(() => {
    if (chats.length === 0) {
      createChat();
    }
  }, [chats.length, createChat]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '100px';
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight > 100) {
        textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
      }
    }
  }, [input]);

  // Set initial height on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '100px';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userInput = input.trim();
    const chatId = activeChat || createChat();

    // Always add to regular chat store for immediate display
    addMessage(chatId, userInput, 'user');

    // Add to AI store
    addAIMessage({
      role: 'user',
      content: userInput,
    });

    // Clear input immediately
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Handle conversation flow
    try {
      const flow = getConversationFlow();
      await flow.handleUserInput(userInput);
    } catch (error) {
      console.error('Conversation flow error:', error);
      addAIMessage({
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getPlaceholder = () => {
    if (isStreaming) return 'AI is responding...';
    if (currentStep === 'welcome') return 'What would you like to build?';
    if (currentStep === 'project-details') return 'Tell us about your project...';
    if (currentStep === 'complexity-choice') return 'Choose static or dynamic...';
    return 'What would you like to change?';
  };

  return (
    <form className="sidebar-chat-input-container" onSubmit={handleSubmit}>
      <div className="sidebar-chat-input-wrapper">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="sidebar-chat-input"
          rows={1}
          disabled={isStreaming}
        />
        <div className="sidebar-chat-input-actions">
          <ModelSelector />
          <button
            type="submit"
            className="sidebar-chat-input-send"
            disabled={!input.trim() || isStreaming}
            aria-label="Send message"
          >
            {isStreaming ? (
              <svg className="sidebar-input-loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
