import { v4 as uuidv4 } from 'uuid';
import db from '../db/client.server';
export function createVideo(userId: string, title: string, description: string, videoUrl: string, thumbnailUrl: string, duration: number, isShort: boolean = false): any {
  const id = uuidv4();
  const createdAt = Date.now();
  const stmt = db.prepare('INSERT INTO videos (id, userId, title, description, videoUrl, thumbnailUrl, duration, isShort, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run(id, userId, title, description, videoUrl, thumbnailUrl, duration, isShort ? 1 : 0, createdAt);
  return { id, userId, title, description, videoUrl, thumbnailUrl, duration, isShort, createdAt };
}
export function getVideoById(id: string): any {
  const stmt = db.prepare('SELECT videos.*, users.username, users.avatarUrl FROM videos JOIN users ON videos.userId = users.id WHERE videos.id = ?');
  return stmt.get(id);
}
export function getVideos(limit: number = 20, offset: number = 0): any[] {
  const stmt = db.prepare('SELECT videos.*, users.username, users.avatarUrl FROM videos JOIN users ON videos.userId = users.id ORDER BY videos.createdAt DESC LIMIT ? OFFSET ?');
  return stmt.all(limit, offset);
}
export function incrementViews(id: string): void {
  const stmt = db.prepare('UPDATE videos SET views = views + 1 WHERE id = ?');
  stmt.run(id);
}