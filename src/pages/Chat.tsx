import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrentChat } from '@/store/slices/chatSlice';
import ChatList from '@/components/Chat/ChatList';
import ChatWindow from '@/components/Chat/ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const { chatId } = useParams();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const { chats, currentChat } = useSelector((state: RootState) => state.chat);

  // Set current chat when chatId changes
  if (chatId && chatId !== currentChat) {
    dispatch(setCurrentChat(chatId));
  }

  return (
    <div className="h-screen flex">
      {/* Chat List - Always visible on desktop, conditional on mobile */}
      {(!isMobile || !currentChat) && (
        <div className={`${isMobile ? 'w-full' : 'w-80'} border-r border-border`}>
          <ChatList />
        </div>
      )}

      {/* Chat Window - Only visible when chat is selected */}
      {currentChat && (!isMobile || chatId) && (
        <div className="flex-1">
          <ChatWindow />
        </div>
      )}

      {/* Empty state for desktop */}
      {!isMobile && !currentChat && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 border-2 border-foreground rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-foreground">
                <path fill="currentColor" d="M12.003 2.001c5.55 0 10.052 4.502 10.052 10.052s-4.502 10.052-10.052 10.052c-1.754 0-3.4-.448-4.832-1.235l-5.143 1.353 1.353-5.143A9.994 9.994 0 0 1 1.951 12.053C1.951 6.503 6.453 2.001 12.003 2.001Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Your messages</h2>
            <p className="text-muted-foreground">Send private photos and messages to a friend</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;