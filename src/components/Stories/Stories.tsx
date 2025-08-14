import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { markStoryViewed } from '@/store/slices/postsSlice';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Stories = () => {
  const { stories } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleStoryClick = (storyId: string) => {
    dispatch(markStoryViewed(storyId));
  };

  return (
    <div className="bg-background rounded-lg border border-gray-200 p-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <Plus size={20} className="text-gray-400" />
            </div>
          </div>
          <span className="text-xs text-center max-w-[64px] truncate text-muted-foreground">Your story</span>
        </div>

        {/* Stories */}
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-0.5 ${story.viewed ? 'bg-gray-200' : 'story-ring'}`}>
                <div className="w-full h-full bg-background rounded-full p-0.5">
                  <img 
                    src={story.userAvatar} 
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            <span className="text-xs text-center max-w-[64px] truncate text-muted-foreground">
              {story.username.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;