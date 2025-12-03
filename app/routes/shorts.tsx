import { getVideos } from '../models/video.server';
import { Button } from '../components/ui/Button';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, MoreVertical } from 'lucide-react';
import type { Route } from './+types/shorts';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Shorts - Youtube" }];
}
export async function loader() {
  const allVideos = getVideos(50);
  const shorts = allVideos.filter((v: any) => v.isShort === 1);
  return { shorts };
}
export default function Shorts({ loaderData }: Route.ComponentProps) {
  const { shorts } = loaderData;
  return (
    <div className="flex flex-col items-center gap-4 py-4 h-[calc(100vh-3.5rem)] overflow-y-scroll snap-y snap-mandatory">
      {shorts.map((video: any) => (
        <div key={video.id} className="relative flex gap-4 snap-start h-full max-h-[calc(100vh-5rem)] w-full max-w-[400px] shrink-0">
          <div className="relative w-full h-full bg-zinc-900 rounded-xl overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-zinc-700" />
                <span className="font-semibold">@{video.username}</span>
                <Button size="sm" variant="secondary" className="h-8 text-xs">Subscribe</Button>
              </div>
              <p className="line-clamp-2">{video.title}</p>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4 pb-4">
            <ActionIcon icon={ThumbsUp} label="Like" />
            <ActionIcon icon={ThumbsDown} label="Dislike" />
            <ActionIcon icon={MessageSquare} label="1.2K" />
            <ActionIcon icon={Share2} label="Share" />
            <ActionIcon icon={MoreVertical} label="" />
          </div>
        </div>
      ))}
    </div>
  );
}
function ActionIcon({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Button variant="secondary" className="rounded-full w-12 h-12 p-0 bg-zinc-800 hover:bg-zinc-700 border-none">
        <Icon className="w-6 h-6" />
      </Button>
      {label && <span className="text-xs font-medium">{label}</span>}
    </div>
  )
}