import { getVideos } from '../models/video.server';
import type { Route } from './+types/feed.history';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Watch History - Youtube" }];
}
export async function loader() {
  const history = getVideos(20);
  return { history };
}
export default function History({ loaderData }: Route.ComponentProps) {
  const { history } = loaderData;
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>
      <div className="flex flex-col gap-4">
        {history.map((video: any) => (
          <div key={video.id} className="flex gap-4 group">
            <div className="relative aspect-video w-40 sm:w-64 shrink-0 rounded-xl overflow-hidden bg-zinc-800">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs font-medium text-white">
                12:34
              </div>
            </div>
            <div className="flex flex-col py-1 gap-1">
              <h3 className="font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">{video.title}</h3>
              <div className="text-xs text-zinc-400">
                {video.username} • {video.views} Views
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}