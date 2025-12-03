import { getPlaylistVideos } from '../models/playlist.server';
import { Button } from '../components/ui/Button';
import { Play, Shuffle, Share2, MoreVertical } from 'lucide-react';
import { Link } from 'react-router';
import type { Route } from './+types/playlist.$playlistId';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Playlist - Youtube" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  const { playlistId } = params;
  if (!playlistId) throw new Response("Not Found", { status: 404 });
  const playlist = {
    id: playlistId,
    name: playlistId === 'WL' ? 'Watch Later' : playlistId === 'LL' ? 'Liked Videos' : 'My Playlist',
    description: 'A Collection Of Videos.',
    videoCount: 10,
    thumbnailUrl: 'https://placehold.co/600x400/1f1f1f/FFF?text=Playlist',
    username: 'User',
  };
  const videos = getPlaylistVideos(playlistId);
  return { playlist, videos };
}
export default function Playlist({ loaderData }: Route.ComponentProps) {
  const { playlist, videos } = loaderData;
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 max-w-6xl mx-auto">
      <div className="lg:w-80 shrink-0 flex flex-col gap-4">
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-800 relative group">
          <img src={playlist.thumbnailUrl} alt={playlist.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button variant="ghost" className="text-white"><Play className="w-8 h-8" /></Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{playlist.name}</h1>
          <div className="text-sm text-zinc-400">
            <span className="font-semibold text-white">{playlist.username}</span> • {playlist.videoCount} Videos • Updated Today
          </div>
          <p className="text-sm text-zinc-400">{playlist.description}</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 rounded-full bg-white text-black hover:bg-gray-200 gap-2">
            <Play className="w-4 h-4 fill-current" /> Play All
          </Button>
          <Button variant="secondary" className="flex-1 rounded-full bg-zinc-800 hover:bg-zinc-700 gap-2">
            <Shuffle className="w-4 h-4" /> Shuffle
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 bg-zinc-800 hover:bg-zinc-700"><Share2 className="w-5 h-5" /></Button>
          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 bg-zinc-800 hover:bg-zinc-700"><MoreVertical className="w-5 h-5" /></Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {videos.length === 0 ? (
          <div className="text-zinc-400 text-center py-10">No Videos In This Playlist Yet.</div>
        ) : (
          videos.map((video: any, index: number) => (
            <div key={video.id} className="flex gap-4 p-2 hover:bg-zinc-900 rounded-xl group">
              <div className="flex items-center justify-center w-6 text-zinc-400 text-sm font-medium">
                {index + 1}
              </div>
              <Link to={`/watch/${video.id}`} className="relative aspect-video w-40 shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs font-medium text-white">
                  4:20
                </div>
              </Link>
              <div className="flex flex-col justify-center gap-1 min-w-0">
                <Link to={`/watch/${video.id}`} className="font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {video.title}
                </Link>
                <div className="text-xs text-zinc-400">
                  {video.username} • {video.views} Views
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}