import { useLoaderData, Link } from 'react-router';
import { getVideos } from '../models/video.server';
import { VideoCard } from '../components/VideoCard';
import type { Route } from './+types/results';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Search Results - Youtube" }];
}
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("searchquery");
  const allVideos = getVideos(100);
  const videos = query
    ? allVideos.filter((v: any) => v.title.toLowerCase().includes(query.toLowerCase()))
    : allVideos;
  return { videos, query };
}
export default function Results({ loaderData }: Route.ComponentProps) {
  const { videos, query } = loaderData;
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-lg font-medium mb-4">Results For "{query}"</h2>
      <div className="flex flex-col gap-4">
        {videos.map((video: any) => (
          <div key={video.id} className="flex gap-4">
            <Link to={`/watch/${video.id}`} className="relative aspect-video w-64 sm:w-80 shrink-0 rounded-xl overflow-hidden bg-zinc-800">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            </Link>
            <div className="flex flex-col py-1">
              <Link to={`/watch/${video.id}`} className="text-lg font-semibold line-clamp-2 mb-1">{video.title}</Link>
              <div className="text-xs text-zinc-400 mb-2">
                {video.views} Views • 2 Days Ago
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src={video.avatarUrl || 'https://placehold.co/100x100'} alt={video.username} className="w-6 h-6 rounded-full" />
                <span className="text-xs text-zinc-400 hover:text-white">{video.username}</span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}