import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, toggleSave, addComment } from '@/store/slices/postsSlice';
import { Post } from '@/store/slices/postsSlice';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLike = () => {
    dispatch(toggleLike(post.id));
    if (!post.liked) {
      toast({
        description: "Post liked!",
        duration: 1000,
      });
    }
  };

  const handleSave = () => {
    dispatch(toggleSave(post.id));
    toast({
      description: post.saved ? "Post unsaved" : "Post saved!",
      duration: 1000,
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    dispatch(addComment({
      postId: post.id,
      comment: {
        username: 'your_username',
        text: comment,
        timestamp: 'now',
        likes: 0
      }
    }));

    setComment('');
    toast({
      description: "Comment added!",
      duration: 1000,
    });
  };

  return (
    <article className="instagram-card max-w-lg mx-auto bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.userAvatar} 
            alt={post.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <span className="font-semibold text-sm">{post.username}</span>
            {post.location && (
              <p className="text-xs text-muted-foreground">{post.location}</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      {/* Image */}
      <div className="relative">
        <img 
          src={post.image} 
          alt="Post"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={post.liked ? 'post-action-liked' : 'post-action'}
              onClick={handleLike}
            >
              <Heart size={24} fill={post.liked ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm" className="post-action">
              <MessageCircle size={24} />
            </Button>
            <Button variant="ghost" size="sm" className="post-action">
              <Send size={24} />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="post-action"
            onClick={handleSave}
          >
            <Bookmark size={24} fill={post.saved ? 'currentColor' : 'none'} />
          </Button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          {post.likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="mb-2">
            {!showComments && post.comments.length > 1 && (
              <button 
                onClick={() => setShowComments(true)}
                className="text-sm text-muted-foreground mb-2"
              >
                View all {post.comments.length} comments
              </button>
            )}
            
            {(showComments ? post.comments : post.comments.slice(-1)).map((comment) => (
              <div key={comment.id} className="mb-1">
                <span className="font-semibold text-sm mr-2">{comment.username}</span>
                <span className="text-sm">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mb-3">{post.timestamp} ago</p>

        {/* Add Comment */}
        <form onSubmit={handleComment} className="flex items-center gap-2">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none p-0 text-sm focus:ring-0"
          />
          {comment.trim() && (
            <Button type="submit" variant="ghost" size="sm" className="text-primary">
              Post
            </Button>
          )}
        </form>
      </div>
    </article>
  );
};

export default PostCard;