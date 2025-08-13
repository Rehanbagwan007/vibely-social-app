import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { setCurrentChat } from '@/store/slices/chatSlice';
import { useUser } from '@clerk/clerk-react';
import { Edit, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatList = () => {
  const { chats, currentChat } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChatSelect = (chatId: string) => {
    dispatch(setCurrentChat(chatId));
    navigate(`/direct/${chatId}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{user?.username || 'user'}</span>
            <ChevronDown size={16} />
          </div>
          <Button variant="ghost" size="sm">
            <Edit size={20} />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-semibold mb-4">Messages</h3>
          
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                  currentChat === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <img 
                    src={chat.userInfo.avatar} 
                    alt={chat.userInfo.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.userInfo.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">
                      {chat.userInfo.username}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastMessage.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      chat.unreadCount > 0 ? 'font-medium' : 'text-muted-foreground'
                    }`}>
                      {chat.lastMessage.senderId === '1' ? 'You: ' : ''}
                      {chat.lastMessage.type === 'heart' ? '❤️' : chat.lastMessage.text}
                    </p>
                    {chat.unreadCount > 0 && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;