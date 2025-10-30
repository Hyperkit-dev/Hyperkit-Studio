'use client';

import { Message } from '@/types/chat';
import { AIMessage } from '@/stores/useAIStore';
import { cn } from '@/lib/utils/cn';

interface ChatItemProps {
  message: Message | AIMessage;
}

export function ChatItem({ message }: ChatItemProps) {
  const isUser = message.role === 'user';
  const isAI = message.role === 'assistant';

  return (
    <div
      className={cn(
        'chat-item',
        isUser ? 'chat-item-user' : 'chat-item-assistant'
      )}
    >
      <div className={cn(
        'chat-item-content',
        isAI && 'ai-response'
      )}>
        <p className="chat-item-text">{message.content}</p>
      </div>
    </div>
  );
}
