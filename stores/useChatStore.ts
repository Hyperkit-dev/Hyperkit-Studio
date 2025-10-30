import { create } from 'zustand';
import { Chat, Message, ChatStatus } from '@/types/chat';

interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  status: ChatStatus;
  
  // Actions
  createChat: () => string;
  deleteChat: (chatId: string) => void;
  setActiveChat: (chatId: string | null) => void;
  addMessage: (chatId: string, content: string, role: 'user' | 'assistant') => void;
  updateChatTitle: (chatId: string, title: string) => void;
  setStatus: (status: ChatStatus) => void;
  clearChats: () => void;
}

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Helper to generate chat title from first message
const generateChatTitle = (firstMessage: string): string => {
  const maxLength = 30;
  if (firstMessage.length <= maxLength) return firstMessage;
  return firstMessage.substring(0, maxLength) + '...';
};

export const useChatStore = create<ChatStore>()((set, get) => ({
  chats: [],
  activeChat: null,
  status: 'idle',
      
      createChat: () => {
        const newChat: Chat = {
          id: generateId(),
          title: 'New Chat',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        };
        
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChat: newChat.id,
        }));
        
        return newChat.id;
      },
      
      deleteChat: (chatId) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          activeChat: state.activeChat === chatId ? null : state.activeChat,
        }));
      },
      
      setActiveChat: (chatId) => {
        set({ activeChat: chatId });
      },
      
      addMessage: (chatId, content, role) => {
        const message: Message = {
          id: generateId(),
          chatId,
          content,
          role,
          timestamp: new Date(),
        };
        
        set((state) => {
          const updatedChats = state.chats.map((chat) => {
            if (chat.id === chatId) {
              const updatedMessages = [...chat.messages, message];
              // Update title based on first user message if title is still "New Chat"
              const newTitle = chat.title === 'New Chat' && role === 'user' && chat.messages.length === 0
                ? generateChatTitle(content)
                : chat.title;
              
              return {
                ...chat,
                title: newTitle,
                messages: updatedMessages,
                updatedAt: new Date(),
              };
            }
            return chat;
          });
          
          return { chats: updatedChats };
        });
      },
      
      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title, updatedAt: new Date() } : chat
          ),
        }));
      },
      
      setStatus: (status) => {
        set({ status });
      },
      
      clearChats: () => {
        set({ chats: [], activeChat: null, status: 'idle' });
      },
}));

// Selector hooks for better performance
export const useActiveChat = () => {
  const chats = useChatStore((state) => state.chats);
  const activeChat = useChatStore((state) => state.activeChat);
  return chats.find((chat) => chat.id === activeChat);
};

export const useChatMessages = (chatId: string | null) => {
  const chats = useChatStore((state) => state.chats);
  if (!chatId) return [];
  const chat = chats.find((c) => c.id === chatId);
  return chat?.messages || [];
};
