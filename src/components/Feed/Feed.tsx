import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import PostCard from './PostCard';

const Feed = () => {
  const { posts } = useSelector((state: RootState) => state.posts);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;