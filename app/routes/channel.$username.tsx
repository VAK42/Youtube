import { NavLink } from 'react-router';
import { getVideos } from '../models/video.server';
import { Button } from '../components/ui/Button';
import { VideoCard } from '../components/VideoCard';
import type { Route } from './+types/channel.$username';
export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.username} - Youtube` }];
}
export async function loader({ params }: Route.LoaderArgs) {
  const channel = {
    username: params.username,
    avatarUrl: 'https://placehold.co/150x150/1f1f1f/FFF?text=U',
    coverUrl: 'https://placehold.co/1200x200/1f1f1f/FFF?text=Banner',
    subscribers: '1.2M',
    videos: '1.5K',
    description: 'Welcome To My Channel!',
  };
  const videos = getVideos(10);
  return { channel, videos };
}
export default function Channel({ loaderData }: Route.ComponentProps) {
  const { channel, videos } = loaderData;
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="h-32 sm:h-52 w-full bg-zinc-800 overflow-hidden">
        <img src={channel.coverUrl} alt="Banner" className="w-full h-full object-cover" />
      </div>
      <div className="px-6 py-6 flex flex-col sm:flex-row items-start gap-6">
        <img src={channel.avatarUrl} alt={channel.username} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-black -mt-4 sm:-mt-0" />
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{channel.username}</h1>
          <div className="text-zinc-400 text-sm flex gap-2">
            <span>@{channel.username}</span>
            <span>•</span>
            <span>{channel.subscribers} Subscribers</span>
            <span>•</span>
            <span>{channel.videos} Videos</span>
          </div>
          <p className="text-zinc-400 text-sm line-clamp-2 max-w-2xl">{channel.description}</p>
          <div className="flex gap-2 mt-2">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 font-medium px-6">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="px-6 border-b border-zinc-800 sticky top-14 bg-black z-10">
        <div className="flex gap-6 overflow-x-auto">
          <Tab to="." label="Home" end />
          <Tab to="videos" label="Videos" />
          <Tab to="shorts" label="Shorts" />
          <Tab to="playlists" label="Playlists" />
          <Tab to="community" label="Community" />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video: any) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}
function Tab({ to, label, end }: { to: string, label: string, end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${isActive ? 'border-white text-white' : 'border-transparent text-zinc-400 hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}