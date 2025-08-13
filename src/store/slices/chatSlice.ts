import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'heart';
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  userInfo: {
    username: string;
    avatar: string;
    fullName: string;
    online: boolean;
  };
}

interface ChatState {
  chats: Chat[];
  currentChat: string | null;
  messages: { [chatId: string]: Message[] };
}

const initialState: ChatState = {
  chats: [
    {
      id: '1',
      participants: ['1', '2'],
      lastMessage: {
        id: '1',
        senderId: '2',
        receiverId: '1',
        text: 'Hey! How are you doing?',
        timestamp: '2m',
        read: false,
        type: 'text'
      },
      unreadCount: 2,
      userInfo: {
        username: 'alex_photos',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        fullName: 'Alex Thompson',
        online: true
      }
    },
    {
      id: '2',
      participants: ['1', '3'],
      lastMessage: {
        id: '2',
        senderId: '1',
        receiverId: '3',
        text: 'Thanks for the photo tip!',
        timestamp: '1h',
        read: true,
        type: 'text'
      },
      unreadCount: 0,
      userInfo: {
        username: 'sarah_travels',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763c5f?w=150&h=150&fit=crop&crop=face',
        fullName: 'Sarah Wilson',
        online: false
      }
    }
  ],
  currentChat: null,
  messages: {
    '1': [
      {
        id: '1',
        senderId: '2',
        receiverId: '1',
        text: 'Hey! How are you doing?',
        timestamp: '2m',
        read: false,
        type: 'text'
      },
      {
        id: '2',
        senderId: '2',
        receiverId: '1',
        text: 'I saw your latest post, amazing shot!',
        timestamp: '1m',
        read: false,
        type: 'text'
      }
    ],
    '2': [
      {
        id: '3',
        senderId: '3',
        receiverId: '1',
        text: 'Your photography tips really helped!',
        timestamp: '2h',
        read: true,
        type: 'text'
      },
      {
        id: '4',
        senderId: '1',
        receiverId: '3',
        text: 'Thanks for the photo tip!',
        timestamp: '1h',
        read: true,
        type: 'text'
      }
    ]
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChat = action.payload;
      // Mark messages as read
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
        const chatMessages = state.messages[action.payload];
        if (chatMessages) {
          chatMessages.forEach(msg => {
            if (msg.receiverId === '1') {
              msg.read = true;
            }
          });
        }
      }
    },
    sendMessage: (state, action: PayloadAction<{ chatId: string; text: string; type?: 'text' | 'image' | 'heart' }>) => {
      const { chatId, text, type = 'text' } = action.payload;
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: '1', // Current user ID
        receiverId: '2', // Placeholder
        text,
        timestamp: 'now',
        read: false,
        type
      };
      
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      
      state.messages[chatId].push(newMessage);
      
      // Update chat last message
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.lastMessage = newMessage;
      }
    },
    markMessagesRead: (state, action: PayloadAction<string>) => {
      const chatMessages = state.messages[action.payload];
      if (chatMessages) {
        chatMessages.forEach(msg => {
          if (msg.receiverId === '1') {
            msg.read = true;
          }
        });
      }
    }
  }
});

export const { setCurrentChat, sendMessage, markMessagesRead } = chatSlice.actions;
export default chatSlice.reducer;