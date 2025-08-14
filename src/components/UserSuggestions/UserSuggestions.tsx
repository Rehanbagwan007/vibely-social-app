import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { followUser, unfollowUser } from '@/store/slices/userSlice';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UserSuggestions = () => {
  const { suggestedUsers } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleFollow = (userId: string) => {
    dispatch(followUser(userId));
  };

  const handleUnfollow = (userId: string) => {
    dispatch(unfollowUser(userId));
  };

  return (
    <div className="bg-background rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground">Suggested for you</h3>
        <button className="text-xs font-semibold text-primary hover:text-primary/80">
          See All
        </button>
      </div>

      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <Link to={`/profile/${user.username}`} className="flex items-center gap-3 flex-1">
              <img 
                src={user.avatar} 
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground hover:text-muted-foreground transition-colors">
                  {user.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.fullName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.followedBy.length > 0 
                    ? `Followed by ${user.followedBy[0]}${user.followedBy.length > 1 ? ` + ${user.followedBy.length - 1} more` : ''}`
                    : 'Suggested for you'
                  }
                </p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => user.following ? handleUnfollow(user.id) : handleFollow(user.id)}
              className={`text-xs font-semibold px-4 py-1 rounded-lg ${
                user.following 
                  ? 'bg-gray-100 text-foreground hover:bg-gray-200' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {user.following ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-muted-foreground space-y-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Press</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <p>© 2024 Vibely</p>
        </div>
      </div>
    </div>
  );
};

export default UserSuggestions;