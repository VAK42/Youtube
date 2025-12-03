import { getVideos } from '../models/video.server';
import { VideoCard } from '../components/VideoCard';
import type { Route } from './+types/feed.subscriptions';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Subscriptions - Youtube" }];
}
export async function loader() {
  const videos = getVideos(30);
  return { videos };
}
export default function Subscriptions({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;
  const today = videos.slice(0, 10);
  const thisWeek = videos.slice(10, 20);
  const older = videos.slice(20);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Latest</h1>
      <Section title="Today" videos={today} />
      <Section title="This Week" videos={thisWeek} />
      <Section title="Older" videos={older} />
    </div>
  )
}
function Section({ title, videos }: { title: string, videos: any[] }) {
  if (videos.length === 0) return null;
  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold text-zinc-400 uppercase mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}