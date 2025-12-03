import db from '../db/client.server';
export function addToHistory(userId: string, videoId: string): void {
  const watchedAt = Date.now();
  const stmt = db.prepare('INSERT OR REPLACE INTO watchHistory (userId, videoId, watchedAt) VALUES (?, ?, ?)');
  stmt.run(userId, videoId, watchedAt);
}
export function getHistory(userId: string, limit: number = 20, offset: number = 0): any[] {
  const stmt = db.prepare('SELECT videos.*, watchHistory.watchedAt FROM videos JOIN watchHistory ON videos.id = watchHistory.videoId WHERE watchHistory.userId = ? ORDER BY watchHistory.watchedAt DESC LIMIT ? OFFSET ?');
  return stmt.all(userId, limit, offset);
}