import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { sendMessage } from '@/store/slices/chatSlice';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Phone, Video, Info, Heart, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const { chats, currentChat, messages } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const chat = chats.find(c => c.id === currentChat);
  const chatMessages = currentChat ? messages[currentChat] || [] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentChat) return;

    dispatch(sendMessage({
      chatId: currentChat,
      text: message,
      type: 'text'
    }));

    setMessage('');
  };

  const handleSendHeart = () => {
    if (!currentChat) return;
    
    dispatch(sendMessage({
      chatId: currentChat,
      text: '❤️',
      type: 'heart'
    }));
  };

  const handleBack = () => {
    if (isMobile) {
      navigate('/direct');
    }
  };

  if (!chat || !currentChat) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft size={20} />
            </Button>
          )}
          
          <div className="relative">
            <img 
              src={chat.userInfo.avatar} 
              alt={chat.userInfo.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            {chat.userInfo.online && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background"></div>
            )}
          </div>
          
          <div>
            <p className="font-semibold text-sm">{chat.userInfo.username}</p>
            <p className="text-xs text-muted-foreground">
              {chat.userInfo.online ? 'Active now' : 'Active 2h ago'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone size={20} />
          </Button>
          <Button variant="ghost" size="sm">
            <Video size={20} />
          </Button>
          <Button variant="ghost" size="sm">
            <Info size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.senderId === '1'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.type === 'heart' ? (
                <span className="text-2xl">❤️</span>
              ) : (
                <p className="text-sm">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Button variant="ghost" size="sm" type="button">
            <Image size={20} />
          </Button>
          
          <Input
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-2 border-border rounded-full"
          />
          
          {message.trim() ? (
            <Button type="submit" variant="ghost" size="sm" className="text-primary font-semibold">
              Send
            </Button>
          ) : (
            <Button type="button" variant="ghost" size="sm" onClick={handleSendHeart}>
              <Heart size={20} />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;