import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import db from './client.server';
async function seed() {
  db.prepare('DELETE FROM videoTags').run();
  db.prepare('DELETE FROM tags').run();
  db.prepare('DELETE FROM watchHistory').run();
  db.prepare('DELETE FROM playlistVideos').run();
  db.prepare('DELETE FROM playlists').run();
  db.prepare('DELETE FROM subscriptions').run();
  db.prepare('DELETE FROM likes').run();
  db.prepare('DELETE FROM comments').run();
  db.prepare('DELETE FROM videos').run();
  db.prepare('DELETE FROM users').run();
  const users = [];
  for (let i = 0; i < 10; i++) {
    const id = uuidv4();
    const passwordHash = await bcrypt.hash('password', 10);
    const username = `user${i}`;
    const email = `user${i}@example.com`;
    const createdAt = Date.now();
    db.prepare('INSERT INTO users (id, username, email, passwordHash, createdAt) VALUES (?, ?, ?, ?, ?)').run(id, username, email, passwordHash, createdAt);
    users.push({ id, username });
  }
  const videos = [];
  for (let i = 0; i < 50; i++) {
    const id = uuidv4();
    const user = users[Math.floor(Math.random() * users.length)];
    const title = `Video Title ${i}`;
    const description = `Info ${i}`;
    const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const thumbnailUrl = `https://picsum.photos/seed/${id}/600/400`;
    const duration = Math.floor(Math.random() * 600) + 60;
    const isShort = Math.random() > 0.8 ? 1 : 0;
    const createdAt = Date.now() - Math.floor(Math.random() * 1000000000);
    db.prepare('INSERT INTO videos (id, userId, title, description, videoUrl, thumbnailUrl, duration, isShort, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(id, user.id, title, description, videoUrl, thumbnailUrl, duration, isShort, createdAt);
    videos.push({ id, isShort });
  }
}
seed().catch(() => { });