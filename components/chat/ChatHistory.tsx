'use client';

import { useChatStore } from '@/stores/useChatStore';
import { useAIStore } from '@/stores/useAIStore';
import { getConversationFlow } from '@/lib/ai/conversation-flow';
import { ChatItem } from './ChatItem';
import { ChatInput } from './ChatInput';
import { StreamingIndicator } from './StreamingIndicator';

export function ChatHistory() {
  const { chats, activeChat } = useChatStore();
  const { 
    currentStep, 
    messages, 
    isStreaming, 
    streamingContent, 
    updateRequirements,
    addMessage: addAIMessage,
  } = useAIStore();

  // For single-chat system, get the active chat or first chat
  const currentChat = chats.find(chat => chat.id === activeChat) || chats[0];

  // Show welcome state when on welcome step
  const showWelcome = currentStep === 'welcome' && messages.length === 0;

  // Quick action buttons
  const quickActions = [
    'Build project with blockchain',
    'Beautiful, responsive landing page',
    'Create analytics dashboard',
    'Custom project'
  ];

  const handleQuickAction = async (input: string) => {
    // Add user message
    addAIMessage({
      role: 'user',
      content: input,
    });

    // Handle through conversation flow
    try {
      const flow = getConversationFlow();
      await flow.handleUserInput(input);
    } catch (error) {
      console.error('Quick action error:', error);
      addAIMessage({
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="chat-history">
      {/* Chat List */}
      <div className="chat-list">
        {showWelcome ? (
          /* Welcome State with Quick Actions */
          <div className="welcome-container">
            <div className="welcome-card">
              <h2 className="welcome-title">What would you like to build?</h2>
              <p className="welcome-subtitle">Choose a quick action or describe your project</p>
              
              <div className="quick-actions">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    className="quick-action-button"
                    onClick={() => handleQuickAction(action)}
                  >
                    <span className="quick-action-label">{action}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Message List */
          <>
            {/* AI Messages */}
            {messages.map((message) => (
              <ChatItem key={message.id} message={message} />
            ))}
            
            {/* Regular Chat Messages (legacy) */}
            {currentChat && currentChat.messages.length > 0 && messages.length === 0 && (
              currentChat.messages.map((message) => (
                <ChatItem key={message.id} message={message} />
              ))
            )}
            
            {/* Streaming Indicator */}
            {isStreaming && (
              <div className="chat-item chat-item-assistant">
                <div className="chat-item-content ai-response">
                  <StreamingIndicator />
                  {streamingContent && (
                    <p className="chat-item-text">{streamingContent}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Empty state for non-welcome */}
            {messages.length === 0 && 
             (!currentChat || currentChat.messages.length === 0) && 
             !isStreaming && (
              <div className="chat-list-empty">
                <p>Start a conversation</p>
                <p className="chat-list-empty-hint">Type your message below</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fixed Input at Bottom */}
      <ChatInput />
    </div>
  );
}
