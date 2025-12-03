import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Upload, Camera } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import type { Route } from './+types/channel.customize';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Customize Channel - Youtube" }];
}
export default function ChannelCustomize() {
  const [channelInfo, setChannelInfo] = useState({
    name: 'My Channel',
    handle: '@mychannel',
    description: 'Welcome To My Channel! Here You\'ll Find Amazing Content.',
  });
  const [bannerPreview, setBannerPreview] = useState('https://placehold.co/1280x300/1f1f1f/FFF?text=Channel+Banner');
  const [avatarPreview, setAvatarPreview] = useState('https://placehold.co/200x200/1f1f1f/FFF?text=Avatar');
  const { addToast } = useToast();
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
      addToast('Banner Updated!', 'success');
    }
  };
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      addToast('Avatar Updated!', 'success');
    }
  };
  const saveChanges = () => {
    addToast('Channel Updated!', 'success');
  };
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Customize Channel</h1>
        <div className="bg-[#282828] rounded-lg overflow-hidden mb-6">
          <div className="relative">
            <img src={bannerPreview} className="w-full h-48 object-cover" />
            <label className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 px-4 py-2 rounded-full cursor-pointer flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="text-sm">Change Banner</span>
              <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
            </label>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <img src={avatarPreview} className="w-24 h-24 rounded-full" />
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm mb-2">Channel Name</label>
                  <Input
                    value={channelInfo.name}
                    onChange={(e) => setChannelInfo({ ...channelInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Handle</label>
                  <Input
                    value={channelInfo.handle}
                    onChange={(e) => setChannelInfo({ ...channelInfo, handle: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Description</label>
              <textarea
                value={channelInfo.description}
                onChange={(e) => setChannelInfo({ ...channelInfo, description: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm"
                rows={5}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="ghost">Cancel</Button>
              <Button onClick={saveChanges}>Publish</Button>
            </div>
          </div>
        </div>
        <div className="bg-[#282828] rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Layout</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm">Show Recent Videos</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm">Show Popular Uploads</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Show Community Posts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}