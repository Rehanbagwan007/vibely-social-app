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
    <div className={`${isMobile ? 'px-4' : 'max-w-lg mx-auto px-6'} py-4 border-b border-border`}>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 text-center cursor-pointer"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className={`${
              story.username === 'your_story' 
                ? 'bg-muted border-2 border-dashed border-muted-foreground' 
                : story.viewed 
                  ? 'p-0.5 bg-muted' 
                  : 'story-ring'
            } rounded-full`}>
              {story.username !== 'your_story' && !story.viewed && (
                <div className="story-ring-inner">
                  <img 
                    src={story.userAvatar} 
                    alt={story.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              )}
              
              {story.username !== 'your_story' && story.viewed && (
                <img 
                  src={story.userAvatar} 
                  alt={story.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              
              {story.username === 'your_story' && (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Plus size={24} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs mt-1 w-16 truncate">
              {story.username === 'your_story' ? 'Your story' : story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;