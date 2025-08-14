import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { followUser, unfollowUser } from '@/store/slices/userSlice';
import { Button } from '@/components/ui/button';
import { Grid, Bookmark, Tag, Heart, MessageCircle } from 'lucide-react';

const UserProfile = () => {
  const { username } = useParams();
  const { suggestedUsers, currentUser, followingUsers } = useSelector((state: RootState) => state.user);
  const { posts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  // Find user by username
  const user = suggestedUsers.find(u => u.username === username) || currentUser;
  const isOwnProfile = user?.id === currentUser?.id;
  const isFollowing = user && followingUsers.includes(user.id);

  const handleFollowToggle = () => {
    if (!user) return;
    if (isFollowing) {
      dispatch(unfollowUser(user.id));
    } else {
      dispatch(followUser(user.id));
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  // Get user's posts
  const userPosts = posts.filter(post => post.username === user.username);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-start gap-8 mb-8">
        <img 
          src={user.avatar} 
          alt={user.username}
          className="w-32 h-32 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">{user.username}</h1>
            {!isOwnProfile && (
              <Button
                onClick={handleFollowToggle}
                className={isFollowing ? 'btn-following' : 'btn-follow'}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
            {isOwnProfile && (
              <Button variant="outline" className="px-6">
                Edit profile
              </Button>
            )}
          </div>
          
          <div className="flex gap-8 mb-4">
            <div>
              <span className="font-semibold">{userPosts.length}</span> posts
            </div>
            <div>
              <span className="font-semibold">{(user as any).followers?.toLocaleString() || '0'}</span> followers
            </div>
            <div>
              <span className="font-semibold">{(user as any).following || '0'}</span> following
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold">{(user as any).fullName || user.username}</h2>
            {(user as any).bio && (
              <p className="text-sm whitespace-pre-line mt-1">{(user as any).bio}</p>
            )}
            {(user as any).website && (
              <a 
                href={(user as any).website} 
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {(user as any).website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-border">
        <div className="flex justify-center gap-16 -mt-px">
          <button className="flex items-center gap-2 py-4 border-t border-foreground text-sm font-semibold">
            <Grid size={12} />
            POSTS
          </button>
          <button className="flex items-center gap-2 py-4 text-sm text-muted-foreground hover:text-foreground">
            <Bookmark size={12} />
            SAVED
          </button>
          <button className="flex items-center gap-2 py-4 text-sm text-muted-foreground hover:text-foreground">
            <Tag size={12} />
            TAGGED
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-8">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div 
              key={post.id} 
              className="aspect-square cursor-pointer group relative overflow-hidden"
            >
              <img 
                src={post.image} 
                alt="Post"
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1">
                    <Heart size={20} fill="white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={20} fill="white" />
                    {post.comments.length}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-2 border-foreground rounded-full flex items-center justify-center mb-4">
              <Grid size={24} />
            </div>
            <h3 className="text-2xl font-light mb-2">No Posts Yet</h3>
            {isOwnProfile && (
              <p className="text-muted-foreground">When you share photos, they'll appear on your profile.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;