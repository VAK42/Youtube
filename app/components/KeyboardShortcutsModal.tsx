import { X } from 'lucide-react';
interface KeyboardShortcutsModalProps {
  onClose: () => void;
}
export function KeyboardShortcutsModal({ onClose }: KeyboardShortcutsModalProps) {
  const shortcuts = [
    { key: 'Space / K', action: 'Play/Pause' },
    { key: 'F', action: 'Fullscreen' },
    { key: 'M', action: 'Mute/Unmute' },
    { key: 'Arrow Right', action: 'Forward 5 Seconds' },
    { key: 'Arrow Left', action: 'Backward 5 Seconds' },
    { key: '?', action: 'Show Shortcuts' },
    { key: '/', action: 'Focus Search' },
  ];
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#282828] rounded-xl w-full max-w-md p-0 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h3 className="text-lg font-bold">Keyboard Shortcuts</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-zinc-700 last:border-0">
              <span className="text-sm text-zinc-400">{shortcut.action}</span>
              <kbd className="px-3 py-1 bg-zinc-700 rounded text-sm font-mono">{shortcut.key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}