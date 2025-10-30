export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export type ChatStatus = 'idle' | 'generating' | 'error';
