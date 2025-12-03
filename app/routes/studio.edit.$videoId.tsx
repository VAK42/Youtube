import { useNavigate } from 'react-router';
import { getVideoById } from '../models/video.server';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import type { Route } from './+types/studio.edit.$videoId';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Edit Video - Youtube Studio" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  const video = getVideoById(params.videoId as string);
  if (!video) throw new Response("Not Found", { status: 404 });
  return { video };
}
export default function StudioEdit({ loaderData }: Route.ComponentProps) {
  const { video } = loaderData;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const handleSave = () => {
    addToast('Video Updated!', 'success');
    navigate('/studio');
  };
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/studio')} className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Edit Video</h1>
        </div>
        <div className="bg-[#282828] rounded-lg p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <select className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm">
                  <option>Public</option>
                  <option>Unlisted</option>
                  <option>Private</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm">
                  <option>Gaming</option>
                  <option>Music</option>
                  <option>Education</option>
                  <option>Entertainment</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input defaultValue={video.title} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={5}
              defaultValue={video.description}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <Input placeholder="Add Tags Separated By Commas" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => navigate('/studio')}>Cancel</Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}