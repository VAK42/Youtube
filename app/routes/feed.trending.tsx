import { getVideos } from '../models/video.server';
import { VideoCard } from '../components/VideoCard';
import { TrendingUp } from 'lucide-react';
import type { Route } from './+types/feed.trending';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Trending - Youtube" }];
}
export async function loader() {
  const videos = getVideos(50);
  return { videos };
}
export default function Trending({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-red-600" />
        <h1 className="text-3xl font-bold">Trending</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}