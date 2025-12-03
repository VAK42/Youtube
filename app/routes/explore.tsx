import { getVideos } from '../models/video.server';
import { Flame, Music, Gamepad2, Trophy, Newspaper } from 'lucide-react';
import type { Route } from './+types/explore';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Explore - Youtube" }];
}
export async function loader() {
  const videos = getVideos(20);
  return { videos };
}
export default function Explore({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        <CategoryCard icon={Flame} label="Trending" color="bg-red-500" />
        <CategoryCard icon={Music} label="Music" color="bg-teal-500" />
        <CategoryCard icon={Gamepad2} label="Gaming" color="bg-rose-500" />
        <CategoryCard icon={Trophy} label="Sports" color="bg-blue-500" />
        <CategoryCard icon={Newspaper} label="News" color="bg-purple-500" />
      </div>
      <h2 className="text-xl font-bold mb-4">Trending Videos</h2>
      <div className="flex flex-col gap-4">
        {videos.map((video: any) => (
          <div key={video.id} className="flex gap-4">
            <div className="relative aspect-video w-64 shrink-0 rounded-xl overflow-hidden bg-zinc-800">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col py-1">
              <h3 className="text-lg font-semibold line-clamp-2 mb-1">{video.title}</h3>
              <div className="text-xs text-zinc-400 mb-2">
                {video.username} • {video.views} Views • 1 Day Ago
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function CategoryCard({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
  return (
    <div className={`h-24 rounded-lg ${color} flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity`}>
      <Icon className="w-8 h-8 text-white" />
      <span className="font-bold text-white shadow-black drop-shadow-md">{label}</span>
    </div>
  );
}