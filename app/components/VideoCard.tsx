import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
export function VideoCard({ video }: { video: any }) {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer">
      <Link to={`/watch/${video.id}`} className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
        <img
          src={video.thumbnailUrl || 'https://placehold.co/600x400/1f1f1f/FFF?text=Thumbnail'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs font-medium text-white">
          {formatDuration(video.duration)}
        </div>
      </Link>
      <div className="flex gap-3 items-start">
        <Link to={`/channel/${video.username}`} className="flex-shrink-0">
          <img
            src={video.avatarUrl || 'https://placehold.co/100x100/1f1f1f/FFF?text=U'}
            alt={video.username}
            className="w-9 h-9 rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/watch/${video.id}`} className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
            {video.title}
          </Link>
          <Link to={`/channel/${video.username}`} className="text-xs text-zinc-400 mt-1 hover:text-white transition-colors">
            {video.username}
          </Link>
          <div className="text-xs text-zinc-400">
            {formatViews(video.views)} Views • {formatDistanceToNow(video.createdAt, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}
function formatDuration(seconds: number): string {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}