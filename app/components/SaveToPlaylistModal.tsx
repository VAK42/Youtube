import { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useToast } from './ui/Toast';
interface SaveToPlaylistModalProps {
  videoId: string;
  onClose: () => void;
}
export function SaveToPlaylistModal({ videoId, onClose }: SaveToPlaylistModalProps) {
  const [playlists, setPlaylists] = useState([
    { id: 'WL', name: 'Watch Later', saved: false },
    { id: 'LL', name: 'Liked Videos', saved: false },
    { id: '1', name: 'My Favorites', saved: true },
    { id: '2', name: 'Learn React', saved: false },
  ]);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { addToast } = useToast();
  const togglePlaylist = (id: string) => {
    setPlaylists(playlists.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
    addToast('Updated Playlist', 'success');
  };
  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    const newId = Date.now().toString();
    setPlaylists([...playlists, { id: newId, name: newPlaylistName, saved: true }]);
    setNewPlaylistName('');
    setShowCreateNew(false);
    addToast(`Created "${newPlaylistName}"`, 'success');
  };
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#282828] rounded-xl w-full max-w-md p-0 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h3 className="text-lg font-bold">Save To Playlist</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-4">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => togglePlaylist(playlist.id)}
              className="w-full flex items-center gap-3 px-2 py-3 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${playlist.saved ? 'bg-blue-600 border-blue-600' : 'border-zinc-500'
                }`}>
                {playlist.saved && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="flex-1 text-left">{playlist.name}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-700">
          {showCreateNew ? (
            <div className="flex gap-2">
              <Input
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Enter Playlist Name"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && createPlaylist()}
              />
              <Button onClick={createPlaylist} size="sm">Create</Button>
              <Button onClick={() => setShowCreateNew(false)} variant="ghost" size="sm">Cancel</Button>
            </div>
          ) : (
            <Button onClick={() => setShowCreateNew(true)} variant="ghost" className="w-full justify-start gap-2">
              <Plus className="w-5 h-5" />
              Create New Playlist
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}