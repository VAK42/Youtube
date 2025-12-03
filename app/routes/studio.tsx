import { getVideos } from '../models/video.server';
import { Button } from '../components/ui/Button';
import { Upload, Edit, BarChart2, Trash2 } from 'lucide-react';
import type { Route } from './+types/studio';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Studio - Youtube" }];
}
export async function loader() {
  const videos = getVideos(20);
  return { videos };
}
export default function Studio({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;
  return (
    <div className="flex min-h-screen bg-[#1f1f1f] text-white">
      <aside className="w-64 border-r border-zinc-700 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-8 h-6 bg-red-600 rounded-lg flex items-center justify-center">
            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
          </div>
          <span className="text-xl font-bold tracking-tighter">Studio</span>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start bg-zinc-800 text-red-500 font-semibold">Content</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Dashboard</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Analytics</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Comments</Button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Channel Content</h1>
          <Button className="gap-2 rounded-sm font-medium bg-blue-600 hover:bg-blue-500 text-white border-none">
            <Upload className="w-4 h-4" /> Create
          </Button>
        </div>
        <div className="bg-[#282828] rounded-md overflow-hidden">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-4 p-4 border-b border-zinc-700 text-xs font-bold text-zinc-400 uppercase">
            <div>Video</div>
            <div>Visibility</div>
            <div>Date</div>
            <div>Views</div>
            <div>Actions</div>
          </div>
          <div className="divide-y divide-zinc-700">
            {videos.map((video: any) => (
              <div key={video.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-4 p-4 items-center hover:bg-[#303030] group">
                <div className="flex gap-4">
                  <img src={video.thumbnailUrl} alt="" className="w-24 h-14 object-cover rounded-sm bg-black" />
                  <div className="flex flex-col justify-center">
                    <div className="font-medium line-clamp-1 text-sm mb-1">{video.title}</div>
                    <div className="text-xs text-zinc-400 line-clamp-1">{video.description}</div>
                  </div>
                </div>
                <div className="text-sm text-zinc-400">Public</div>
                <div className="text-sm text-zinc-400">Oct 24, 2023</div>
                <div className="text-sm text-zinc-400">{video.views}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><BarChart2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}