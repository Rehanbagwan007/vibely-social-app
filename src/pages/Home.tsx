import Feed from '@/components/Feed/Feed';
import Stories from '@/components/Stories/Stories';
import UserSuggestions from '@/components/UserSuggestions/UserSuggestions';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Desktop Only */}
      {!isMobile && (
        <header className="bg-background border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-foreground">Feed</h1>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart size={18} />
                <span>Notifications</span>
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Search" 
                  className="pl-10 w-80 bg-gray-100 border-gray-200"
                />
              </div>
            </div>
          </div>
        </header>
      )}
      
      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 px-8 py-6">
          {/* Stories */}
          <div className="mb-8">
            <Stories />
          </div>
          
          {/* Feed */}
          <Feed />
        </div>
        
        {/* Right Sidebar - User Suggestions */}
        {!isMobile && (
          <div className="w-80 px-6 py-6">
            <UserSuggestions />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;