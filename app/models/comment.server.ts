import { v4 as uuidv4 } from 'uuid';
import db from '../db/client.server';
export function createComment(videoId: string, userId: string, content: string, parentId: string | null = null): any {
  const id = uuidv4();
  const createdAt = Date.now();
  const stmt = db.prepare('INSERT INTO comments (id, videoId, userId, content, parentId, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(id, videoId, userId, content, parentId, createdAt);
  return { id, videoId, userId, content, parentId, createdAt };
}
export function getCommentsForVideo(videoId: string): any[] {
  const stmt = db.prepare('SELECT comments.*, users.username, users.avatarUrl FROM comments JOIN users ON comments.userId = users.id WHERE videoId = ? ORDER BY createdAt DESC');
  return stmt.all(videoId);
}