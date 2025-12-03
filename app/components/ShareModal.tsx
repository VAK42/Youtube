import { X, Facebook, Twitter, Mail, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
interface ShareModalProps {
  url: string;
  title: string;
  onClose: () => void;
}
export function ShareModal({ url, title, onClose }: ShareModalProps) {
  const { addToast } = useToast();
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    addToast('Link Copied!', 'success');
  };
  const shareOptions = [
    { icon: LinkIcon, label: 'Copy Link', action: copyLink },
    { icon: Twitter, label: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`) },
    { icon: Facebook, label: 'Facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`) },
    { icon: Mail, label: 'Email', action: () => window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  ];
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#282828] rounded-xl w-full max-w-md p-0 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h3 className="text-lg font-bold">Share</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {shareOptions.map((option) => (
              <button
                key={option.label}
                onClick={option.action}
                className="flex flex-col items-center gap-2 p-3 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                  <option.icon className="w-6 h-6" />
                </div>
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm"
            />
            <Button onClick={copyLink} size="sm">Copy</Button>
          </div>
        </div>
      </div>
    </div>
  )
}