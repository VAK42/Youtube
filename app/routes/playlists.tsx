import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, X, Lock, Globe, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import type { Route } from './+types/playlists';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Your Playlists - Youtube" }];
}
export default function Playlists() {
  const [playlists, setPlaylists] = useState([
    { id: '1', name: 'Favorites', count: 12, isPrivate: false },
    { id: '2', name: 'Watch Later', count: 45, isPrivate: false },
    { id: '3', name: 'Secret Collection', count: 8, isPrivate: true },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '', isPrivate: false });
  const { addToast } = useToast();
  const createPlaylist = () => {
    if (!newPlaylist.name.trim()) return;
    const id = Date.now().toString();
    setPlaylists([...playlists, { id, name: newPlaylist.name, count: 0, isPrivate: newPlaylist.isPrivate }]);
    setNewPlaylist({ name: '', description: '', isPrivate: false });
    setShowCreateModal(false);
    addToast('Playlist Created!', 'success');
  };
  const deletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
    addToast('Playlist Deleted', 'info');
  };
  const updatePlaylist = (id: string, name: string) => {
    setPlaylists(playlists.map(p => p.id === id ? { ...p, name } : p));
    setEditingId(null);
    addToast('Playlist Updated!', 'success');
  };
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Playlist
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-zinc-900 rounded-xl overflow-hidden group">
            <Link to={`/playlist/${playlist.id}`}>
              <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center relative">
                <div className="text-4xl font-bold text-zinc-600">{playlist.count}</div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                  {playlist.count} Videos
                </div>
              </div>
            </Link>
            <div className="p-4">
              {editingId === playlist.id ? (
                <div className="flex gap-2">
                  <Input
                    defaultValue={playlist.name}
                    onBlur={(e) => updatePlaylist(playlist.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && updatePlaylist(playlist.id, e.currentTarget.value)}
                    autoFocus
                    className="text-sm"
                  />
                </div>
              ) : (
                <h3 className="font-semibold line-clamp-1 mb-1">{playlist.name}</h3>
              )}
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                {playlist.isPrivate ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                <span>{playlist.isPrivate ? 'Private' : 'Public'}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => setEditingId(playlist.id)} className="h-8 px-2">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePlaylist(playlist.id)} className="h-8 px-2 hover:text-red-500">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
          <div className="bg-[#282828] rounded-xl w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Create Playlist</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Name</label>
                <Input
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                  placeholder="Enter Playlist Name"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Description (Optional)</label>
                <textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm"
                  rows={3}
                  placeholder="Tell Viewers About Your Playlist"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newPlaylist.isPrivate}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, isPrivate: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm">Make Private</label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button onClick={createPlaylist}>Create</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}