import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  MessageCircle 
} from 'lucide-react';
import CreatePostModal from '@/components/Modals/CreatePostModal';

const MobileNav = () => {
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navItems = [
    { icon: Home, path: '/' },
    { icon: Search, path: '/search' },
    { icon: PlusSquare, action: () => setShowCreateModal(true) },
    { icon: MessageCircle, path: '/direct' },
    { icon: Heart, path: '/notifications' },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex items-center justify-around h-12 px-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            
            if (item.action) {
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon size={24} />
                </button>
              );
            }

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `p-2 hover:bg-muted rounded-lg transition-colors ${isActive ? 'text-primary font-bold' : ''}`
                }
              >
                <Icon size={24} />
              </NavLink>
            );
          })}

          {/* Profile */}
          <NavLink
            to={`/profile/${user?.username}`}
            className="p-1"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img 
                src={user?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </NavLink>
        </div>
      </nav>

      <CreatePostModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </>
  );
};

export default MobileNav;