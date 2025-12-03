import { Link, useLocation } from 'react-router';
import { Home, Compass, Plus, PlaySquare, User } from 'lucide-react';
export function MobileBottomNav() {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Shorts', path: '/shorts' },
    { icon: Plus, label: 'Create', path: '/upload', special: true },
    { icon: PlaySquare, label: 'Library', path: '/feed/library' },
    { icon: User, label: 'You', path: '/settings' },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          if (item.special) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-7 h-7 text-black" />
                </div>
              </Link>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${active ? 'text-white' : 'text-zinc-400'
                }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  )
}