import { useState } from 'react';
import { Link, Form, useLocation } from 'react-router';
import { Menu, Search, Bell, Video, Home, Compass, PlaySquare, Clock, ThumbsUp, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { cn } from './ui/Button';
import { MobileBottomNav } from './MobileBottomNav';
export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="fixed top-0 left-0 right-0 h-14 bg-black border-b border-zinc-800 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-2">
            <Menu className="w-6 h-6" />
          </Button>
          <Link to="/" className="flex items-center gap-1">
            <div className="w-8 h-6 bg-red-600 rounded-lg flex items-center justify-center">
              <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">YouTube</span>
          </Link>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          <Form action="/results" className="flex gap-2">
            <div className="flex flex-1">
              <Input
                name="search_query"
                placeholder="Search"
                className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:border-blue-500"
              />
              <Button type="submit" variant="secondary" className="rounded-l-none border border-l-0 border-zinc-700 px-5">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </Form>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800 rounded-full">
            <Video className="w-6 h-6" />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-800 rounded-full relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-black"></span>
            </Button>
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[#282828] border border-zinc-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-zinc-700 flex justify-between items-center">
                  <span className="font-medium">Notifications</span>
                  <Settings className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4 py-3 hover:bg-zinc-700 flex gap-3 cursor-pointer">
                      <div className="w-10 h-10 bg-blue-500 rounded-full shrink-0"></div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm line-clamp-2">New Video From Your Favorite Creator: "How To Build A Youtube Clone"</p>
                        <span className="text-xs text-zinc-400">2 hours ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative ml-2">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-medium hover:opacity-80 transition-opacity"
            >
              U
            </button>
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-[#282828] border border-zinc-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-zinc-700 flex gap-3 items-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-lg font-medium">U</div>
                  <div className="flex flex-col">
                    <span className="font-medium">User Name</span>
                    <span className="text-sm text-zinc-400">@username</span>
                    <Link to="/channel/username" className="text-blue-400 text-sm mt-1 hover:underline">View Your Channel</Link>
                  </div>
                </div>
                <div className="py-2">
                  <Link to="/studio" className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-700 text-sm">
                    <Video className="w-5 h-5" />
                    <span>YouTube Studio</span>
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-700 text-sm">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-zinc-700 my-2"></div>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-700 text-sm w-full text-left">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-700 text-sm w-full text-left">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex pt-14">
        <aside
          className={cn(
            'fixed left-0 top-14 bottom-0 w-60 bg-black overflow-y-auto transition-transform duration-200 ease-in-out z-40',
            !isSidebarOpen && '-translate-x-full'
          )}
        >
          <nav className="p-2 space-y-1">
            <SidebarItem icon={Home} label="Home" to="/" isActive={location.pathname === '/'} />
            <SidebarItem icon={Compass} label="Shorts" to="/shorts" isActive={location.pathname === '/shorts'} />
            <SidebarItem icon={PlaySquare} label="Subscriptions" to="/feed/subscriptions" isActive={location.pathname === '/feed/subscriptions'} />
            <hr className="my-2 border-zinc-800" />
            <div className="px-3 py-2 text-sm font-medium">You</div>
            <SidebarItem icon={Clock} label="History" to="/feed/history" isActive={location.pathname === '/feed/history'} />
            <SidebarItem icon={Clock} label="Watch Later" to="/playlist/WL" isActive={location.pathname === '/playlist/WL'} />
            <SidebarItem icon={ThumbsUp} label="Liked Videos" to="/playlist/LL" isActive={location.pathname === '/playlist/LL'} />
          </nav>
        </aside>
        <main
          className={cn(
            'flex-1 min-h-[calc(100vh-3.5rem)] transition-all duration-200 ease-in-out pb-16 md:pb-0',
            isSidebarOpen ? 'ml-60' : 'ml-0'
          )}
        >
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
function SidebarItem({ icon: Icon, label, to, isActive }: { icon: any, label: string, to: string, isActive: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  )
}