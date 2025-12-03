import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Trash2, X, Search } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import type { Route } from './+types/feed.history.manage';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "History - Youtube" }];
}
export default function HistoryManage() {
  const [videos, setVideos] = useState([
    { id: '1', title: 'Video 1', thumbnailUrl: 'https://placehold.co/320x180', views: 1200, duration: 600, timestamp: 'Yesterday' },
    { id: '2', title: 'Video 2', thumbnailUrl: 'https://placehold.co/320x180', views: 3400, duration: 450, timestamp: 'Yesterday' },
    { id: '3', title: 'Video 3', thumbnailUrl: 'https://placehold.co/320x180', views: 5600, duration: 720, timestamp: '2 Days Ago' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const { addToast } = useToast();
  const deleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    addToast('Removed From History', 'info');
  };
  const clearAllHistory = () => {
    setVideos([]);
    setShowClearModal(false);
    addToast('Watch History Cleared', 'success');
  };
  const filteredVideos = searchQuery
    ? videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : videos;
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Watch History</h1>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Watch History"
              className="bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 pr-10 text-sm w-64"
            />
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>
          <Button variant="ghost" onClick={() => setShowClearModal(true)} className="gap-2">
            <Trash2 className="w-4 h-4" /> Clear All
          </Button>
        </div>
      </div>
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p>No Watch History</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map((video: any) => (
            <div key={video.id} className="flex gap-4 items-start group">
              <Link to={`/watch/${video.id}`} className="flex-1">
                <div className="flex gap-4">
                  <img src={video.thumbnailUrl} className="w-40 h-24 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold line-clamp-2 mb-1">{video.title}</h3>
                    <p className="text-sm text-zinc-400">{video.timestamp}</p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => deleteVideo(video.id)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-zinc-800 rounded-full transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowClearModal(false)}>
          <div className="bg-[#282828] rounded-xl w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Clear Watch History?</h3>
            <p className="text-zinc-400 mb-6">This Will Remove All Videos From Your Watch History. This Action Cannot Be Undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowClearModal(false)}>Cancel</Button>
              <Button onClick={clearAllHistory} className="bg-red-600 hover:bg-red-500">Clear History</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}