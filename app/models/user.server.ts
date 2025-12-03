import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import db from '../db/client.server';
export async function createUser(username: string, email: string, password: string): Promise<any> {
  const passwordHash = await bcrypt.hash(password, 10);
  const id = uuidv4();
  const createdAt = Date.now();
  const stmt = db.prepare('INSERT INTO users (id, username, email, passwordHash, createdAt) VALUES (?, ?, ?, ?, ?)');
  stmt.run(id, username, email, passwordHash, createdAt);
  return { id, username, email, createdAt };
}
export function getUserByEmail(email: string): any {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
}
export function getUserById(id: string): any {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id);
}
export async function verifyLogin(email: string, password: string): Promise<any> {
  const user = getUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}