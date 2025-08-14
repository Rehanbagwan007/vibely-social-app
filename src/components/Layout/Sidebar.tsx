import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import { 
  Home, 
  Search, 
  Compass, 
  MessageCircle, 
  Film, 
  BarChart3,
  Settings,
  PlusSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePostModal from '@/components/Modals/CreatePostModal';

const Sidebar = () => {
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Feed', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: MessageCircle, label: 'Profile', path: `/profile/${user?.username}` },
    { icon: MessageCircle, label: 'Direct Messages', path: '/direct' },
    { icon: Film, label: 'IGTV', path: '/igtv' },
    { icon: BarChart3, label: 'Stats', path: '/stats' },
  ];

  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border z-40">
        <div className="p-6">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
              <img 
                src={user?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-semibold text-lg mb-1">{user?.fullName || 'Olivia Malone'}</h2>
            <p className="text-muted-foreground text-sm mb-4">Auckland, NZ</p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="font-semibold">150</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="font-semibold">1.2m</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="font-semibold">320</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item h-12 ${isActive ? 'font-bold bg-muted' : ''}`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Settings at bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <NavLink
              to="/settings"
              className="nav-item h-12"
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <CreatePostModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </>
  );
};

export default Sidebar;