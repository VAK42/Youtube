import { Link } from 'react-router';
import { Clock, ThumbsUp, PlaySquare, History } from 'lucide-react';
import type { Route } from './+types/feed.library';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Library - Youtube" }];
}
export default function Library() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LibraryCard
          icon={History}
          title="History"
          description="Watch History"
          to="/feed/history"
          color="bg-purple-600"
        />
        <LibraryCard
          icon={Clock}
          title="Watch Later"
          description="0 Videos"
          to="/playlist/WL"
          color="bg-blue-600"
        />
        <LibraryCard
          icon={ThumbsUp}
          title="Liked Videos"
          description="0 Videos"
          to="/playlist/LL"
          color="bg-red-600"
        />
        <LibraryCard
          icon={PlaySquare}
          title="Playlists"
          description="View All Playlists"
          to="/feed/playlists"
          color="bg-green-600"
        />
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <Link key={i} to={`/playlist/playlist-${i}`} className="group">
              <div className="aspect-video bg-zinc-800 rounded-xl mb-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
                <div className="absolute bottom-0 right-0 bg-black/80 px-2 py-1 text-xs font-medium">
                  10 Videos
                </div>
              </div>
              <h3 className="font-semibold line-clamp-1 group-hover:text-blue-400 transition-colors">My Playlist {i}</h3>
              <p className="text-xs text-zinc-400">Created By You</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
function LibraryCard({ icon: Icon, title, description, to, color }: { icon: any, title: string, description: string, to: string, color: string }) {
  return (
    <Link to={to} className="group">
      <div className={`${color} rounded-xl p-6 aspect-video flex flex-col justify-between hover:opacity-90 transition-opacity`}>
        <Icon className="w-12 h-12 text-white" />
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}