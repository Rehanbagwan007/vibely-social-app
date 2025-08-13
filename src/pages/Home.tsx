import Feed from '@/components/Feed/Feed';
import Stories from '@/components/Stories/Stories';
import Suggestions from '@/components/Suggestions/Suggestions';
import { useIsMobile } from '@/hooks/use-mobile';

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Stories */}
      <Stories />
      
      <div className={`${isMobile ? 'px-0' : 'max-w-6xl mx-auto px-6 py-8'}`}>
        <div className="flex gap-8">
          {/* Main Feed */}
          <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-lg'}`}>
            <Feed />
          </div>
          
          {/* Suggestions Sidebar - Desktop Only */}
          {!isMobile && (
            <div className="w-80">
              <Suggestions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;