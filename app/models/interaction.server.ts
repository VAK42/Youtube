import db from '../db/client.server';
export function likeVideo(userId: string, videoId: string, type: 'LIKE' | 'DISLIKE'): void {
  const stmt = db.prepare('INSERT OR REPLACE INTO likes (userId, videoId, type) VALUES (?, ?, ?)');
  stmt.run(userId, videoId, type);
}
export function subscribe(subscriberId: string, channelId: string): void {
  const createdAt = Date.now();
  const stmt = db.prepare('INSERT OR IGNORE INTO subscriptions (subscriberId, channelId, createdAt) VALUES (?, ?, ?)');
  stmt.run(subscriberId, channelId, createdAt);
}
export function unsubscribe(subscriberId: string, channelId: string): void {
  const stmt = db.prepare('DELETE FROM subscriptions WHERE subscriberId = ? AND channelId = ?');
  stmt.run(subscriberId, channelId);
}
export function getSubscriptionStatus(subscriberId: string, channelId: string): boolean {
  const stmt = db.prepare('SELECT 1 FROM subscriptions WHERE subscriberId = ? AND channelId = ?');
  return !!stmt.get(subscriberId, channelId);
}
export function getLikeStatus(userId: string, videoId: string): 'LIKE' | 'DISLIKE' | null {
  const stmt = db.prepare('SELECT type FROM likes WHERE userId = ? AND videoId = ?');
  const result = stmt.get(userId, videoId) as { type: 'LIKE' | 'DISLIKE' } | undefined;
  return result ? result.type : null;
}