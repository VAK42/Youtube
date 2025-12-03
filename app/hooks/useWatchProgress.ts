import { useEffect, useRef } from 'react';
interface WatchProgressProps {
  videoId: string;
  onProgress: (progress: number) => void;
  initialProgress?: number;
}
export function useWatchProgress({ videoId, onProgress, initialProgress = 0 }: WatchProgressProps) {
  const progressRef = useRef(initialProgress);
  const saveProgressToStorage = (progress: number) => {
    try {
      const stored = JSON.parse(localStorage.getItem('watchProgress') || '{}');
      stored[videoId] = {
        progress,
        timestamp: Date.now(),
      };
      localStorage.setItem('watchProgress', JSON.stringify(stored));
      onProgress(progress);
    } catch (error) {
    }
  };
  const getStoredProgress = (): number => {
    try {
      const stored = JSON.parse(localStorage.getItem('watchProgress') || '{}');
      return stored[videoId]?.progress || 0;
    } catch (error) {
      return 0;
    }
  };
  useEffect(() => {
    progressRef.current = getStoredProgress();
  }, [videoId]);
  return {
    saveProgress: saveProgressToStorage,
    getProgress: getStoredProgress,
    currentProgress: progressRef.current,
  };
}
export function clearWatchProgress(videoId?: string) {
  try {
    if (videoId) {
      const stored = JSON.parse(localStorage.getItem('watchProgress') || '{}');
      delete stored[videoId];
      localStorage.setItem('watchProgress', JSON.stringify(stored));
    } else {
      localStorage.removeItem('watchProgress');
    }
  } catch (error) {
  }
}