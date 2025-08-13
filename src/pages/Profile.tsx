import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useUser } from '@clerk/clerk-react';
import { Grid, Bookmark, Tag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { username } = useParams();
  const { user } = useUser();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isOwnProfile = !username || username === user?.username;

  // Mock profile data - in real app, fetch based on username
  const profileData = {
    username: isOwnProfile ? (user?.username || 'your_username') : username,
    fullName: isOwnProfile ? (user?.fullName || 'Your Name') : 'Profile User',
    avatar: isOwnProfile ? (user?.imageUrl || currentUser?.avatar) : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: isOwnProfile ? currentUser?.bio : 'Photography enthusiast 📸\nLiving life one shot at a time ✨',
    followers: isOwnProfile ? currentUser?.followers : 2450,
    following: isOwnProfile ? currentUser?.following : 1200,
    posts: isOwnProfile ? currentUser?.posts : 156,
    verified: false,
    website: 'example.com'
  };

  // Mock posts data
  const mockPosts = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1520637836862-4d197d17c91a?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img 
              src={profileData.avatar} 
              alt={profileData.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-xl font-semibold">{profileData.username}</h1>
            
            {isOwnProfile ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit profile</Button>
                <Button variant="outline" size="sm">
                  <Settings size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" className="btn-follow">Follow</Button>
                <Button variant="outline" size="sm">Message</Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 mb-4">
            <div className="text-center">
              <span className="font-semibold">{profileData.posts}</span>
              <span className="text-muted-foreground ml-1">posts</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">{profileData.followers?.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">followers</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">{profileData.following?.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">following</span>
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-sm">
            <p className="font-semibold">{profileData.fullName}</p>
            <p className="text-sm whitespace-pre-line mt-1">{profileData.bio}</p>
            {profileData.website && (
              <a href={`https://${profileData.website}`} className="text-sm text-primary hover:underline">
                {profileData.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid size={16} />
            <span className="hidden sm:inline">POSTS</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark size={16} />
            <span className="hidden sm:inline">SAVED</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center gap-2">
            <Tag size={16} />
            <span className="hidden sm:inline">TAGGED</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {mockPosts.map((post, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-sm cursor-pointer group">
                <img 
                  src={post} 
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="text-center py-12">
            <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Only you can see what you've saved</p>
          </div>
        </TabsContent>

        <TabsContent value="tagged">
          <div className="text-center py-12">
            <Tag size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Photos of you will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;