import { v4 as uuidv4 } from 'uuid';
import db from '../db/client.server';
export function createPost(userId: string, content: string, type: 'text' | 'poll' = 'text', options: string[] = []) {
  const id = uuidv4();
  const createdAt = Date.now();
  const optionsStr = JSON.stringify(options);
  const stmt = db.prepare('INSERT INTO posts (id, userId, content, createdAt, type, options) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(id, userId, content, createdAt, type, optionsStr);
  return { id, userId, content, createdAt };
}
export function getPosts(username: string) {
  const stmt = db.prepare('SELECT posts.*, users.username as author FROM posts LEFT JOIN users ON posts.userId = users.id WHERE users.username = ? ORDER BY posts.createdAt DESC');
  const posts = stmt.all(username);
  return posts.map((post: any) => ({
    ...post,
    date: new Date(post.createdAt).toLocaleDateString(),
    options: post.options ? JSON.parse(post.options) : undefined
  }));
}