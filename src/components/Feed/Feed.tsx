import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import PostCard from './PostCard';
import { useIsMobile } from '@/hooks/use-mobile';

const Feed = () => {
  const { posts } = useSelector((state: RootState) => state.posts);
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;