import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  Menu,
  Bookmark,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePostModal from '@/components/Modals/CreatePostModal';

const Sidebar = () => {
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Film, label: 'Reels', path: '/reels' },
    { icon: MessageCircle, label: 'Messages', path: '/direct' },
    { icon: Heart, label: 'Notifications', path: '/notifications' },
    { icon: PlusSquare, label: 'Create', action: () => setShowCreateModal(true) },
  ];

  const moreItems = [
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <nav className={`fixed left-0 top-0 h-full bg-background border-r border-border z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            {!collapsed ? (
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Vibely
              </h1>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              if (item.action) {
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    onClick={item.action}
                    className={`w-full justify-start gap-3 h-12 ${collapsed ? 'px-3' : 'px-3'}`}
                  >
                    <Icon size={24} />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </Button>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item h-12 ${isActive ? 'font-bold' : ''} ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <Icon size={24} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}

            {/* Profile */}
            <NavLink
              to={`/profile/${user?.username}`}
              className={({ isActive }) =>
                `nav-item h-12 ${isActive ? 'font-bold' : ''} ${collapsed ? 'justify-center' : ''}`
              }
            >
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img 
                  src={user?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {!collapsed && <span>Profile</span>}
            </NavLink>
          </div>

          {/* More section */}
          <div className="mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              className={`w-full justify-start gap-3 h-12 ${collapsed ? 'px-3' : 'px-3'}`}
            >
              <Menu size={24} />
              {!collapsed && <span className="font-medium">More</span>}
            </Button>

            {!collapsed && (
              <div className="mt-2 space-y-2">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className="nav-item h-10"
                    >
                      <Icon size={20} />
                      <span className="text-sm">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Button */}
          <div className="absolute bottom-6 left-6">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
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