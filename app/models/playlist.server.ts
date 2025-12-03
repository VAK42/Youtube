import { v4 as uuidv4 } from 'uuid';
import db from '../db/client.server';
export function createPlaylist(userId: string, name: string, description: string, isPrivate: boolean = false): any {
  const id = uuidv4();
  const createdAt = Date.now();
  const stmt = db.prepare('INSERT INTO playlists (id, userId, name, description, isPrivate, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(id, userId, name, description, isPrivate ? 1 : 0, createdAt);
  return { id, userId, name, description, isPrivate, createdAt };
}
export function getPlaylistsByUserId(userId: string): any[] {
  const stmt = db.prepare('SELECT * FROM playlists WHERE userId = ? ORDER BY createdAt DESC');
  return stmt.all(userId);
}
export function addVideoToPlaylist(playlistId: string, videoId: string): void {
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM playlistVideos WHERE playlistId = ?');
  const { count } = countStmt.get(playlistId) as { count: number };
  const stmt = db.prepare('INSERT OR IGNORE INTO playlistVideos (playlistId, videoId, position) VALUES (?, ?, ?)');
  stmt.run(playlistId, videoId, count + 1);
}
export function getPlaylistVideos(playlistId: string): any[] {
  const stmt = db.prepare('SELECT videos.*, playlistVideos.position FROM videos JOIN playlistVideos ON videos.id = playlistVideos.videoId WHERE playlistVideos.playlistId = ? ORDER BY playlistVideos.position ASC');
  return stmt.all(playlistId);
}