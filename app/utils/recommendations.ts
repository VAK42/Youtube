interface Video {
  id: string;
  title: string;
  tags?: string[];
  views: number;
  userId: string;
}
export function getRecommendations(currentVideo: Video, allVideos: Video[], limit = 10): Video[] {
  const scores = allVideos
    .filter(v => v.id !== currentVideo.id)
    .map(video => {
      let score = 0;
      if (video.userId === currentVideo.userId) score += 50;
      const currentTags = currentVideo.tags || [];
      const videoTags = video.tags || [];
      const sharedTags = currentTags.filter(tag => videoTags.includes(tag));
      score += sharedTags.length * 20;
      const titleWords = currentVideo.title.toLowerCase().split(' ');
      const videoTitleWords = video.title.toLowerCase().split(' ');
      const sharedWords = titleWords.filter(word => videoTitleWords.includes(word) && word.length > 3);
      score += sharedWords.length * 10;
      score += Math.log(video.views + 1) * 2;
      score += Math.random() * 5;
      return { video, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.video);
  return scores;
}
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}