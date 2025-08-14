import Feed from '@/components/Feed/Feed';
import Stories from '@/components/Stories/Stories';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Header - Desktop Only */}
      {!isMobile && (
        <header className="border-b border-border bg-background">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold">Feed</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Heart size={20} />
                Notifications
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Search" 
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </header>
      )}
      
      {/* Stories */}
      <Stories />
      
      <div className={`${isMobile ? 'px-0' : 'px-8 py-6'}`}>
        {/* Main Feed */}
        <div className={`${isMobile ? 'w-full' : 'max-w-4xl'}`}>
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Home;