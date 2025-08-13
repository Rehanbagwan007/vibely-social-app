import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { followUser, unfollowUser } from '@/store/slices/userSlice';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

const Suggestions = () => {
  const { currentUser, suggestedUsers } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { user } = useUser();

  const handleFollow = (userId: string) => {
    dispatch(followUser(userId));
  };

  const handleUnfollow = (userId: string) => {
    dispatch(unfollowUser(userId));
  };

  return (
    <div className="space-y-6 sticky top-6">
      {/* Current User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={user?.imageUrl || currentUser?.avatar} 
            alt="Your profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{user?.username || currentUser?.username}</p>
            <p className="text-muted-foreground text-sm">{user?.fullName || currentUser?.fullName}</p>
          </div>
        </div>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-6 h-6"
            }
          }}
        />
      </div>

      {/* Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Suggested for you</h3>
          <button className="text-xs font-semibold text-foreground hover:text-muted-foreground">
            See All
          </button>
        </div>

        <div className="space-y-3">
          {suggestedUsers.map((suggestedUser) => (
            <div key={suggestedUser.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={suggestedUser.avatar} 
                  alt={suggestedUser.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{suggestedUser.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {suggestedUser.followedBy.length > 0 
                      ? `Followed by ${suggestedUser.followedBy[0]}${suggestedUser.followedBy.length > 1 ? ` + ${suggestedUser.followedBy.length - 1} more` : ''}`
                      : 'Suggested for you'
                    }
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => suggestedUser.following ? handleUnfollow(suggestedUser.id) : handleFollow(suggestedUser.id)}
                className="text-primary text-xs font-semibold hover:text-primary/80"
              >
                {suggestedUser.following ? 'Following' : 'Follow'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-muted-foreground space-y-2">
        <div className="flex flex-wrap gap-2">
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
  );
};

export default Suggestions;