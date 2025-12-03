import { v4 as uuidv4 } from 'uuid';
import db from '../db/client.server';
export function createTag(name: string): string {
  const existing = db.prepare('SELECT id FROM tags WHERE name = ?').get(name) as { id: string } | undefined;
  if (existing) return existing.id;
  const id = uuidv4();
  const stmt = db.prepare('INSERT INTO tags (id, name) VALUES (?, ?)');
  stmt.run(id, name);
  return id;
}
export function addTagToVideo(videoId: string, tagId: string): void {
  const stmt = db.prepare('INSERT OR IGNORE INTO videoTags (videoId, tagId) VALUES (?, ?)');
  stmt.run(videoId, tagId);
}
export function getTagsForVideo(videoId: string): string[] {
  const stmt = db.prepare('SELECT tags.name FROM tags JOIN videoTags ON tags.id = videoTags.tagId WHERE videoTags.videoId = ?');
  const rows = stmt.all(videoId) as { name: string }[];
  return rows.map(row => row.name);
}