import { createCookieSessionStorage, redirect } from 'react-router';
import { getUserById, verifyLogin } from './models/user.server';
export { verifyLogin };
const sessionSecret = '91cb21720e03fd99b10eb90344c96285d7027079993b356a01200b3b6016031d0818f39f143abe632384a7595cca021ac4616d2e18e9e8ab352ae9205052b12d';
export const storage = createCookieSessionStorage({
  cookie: {
    name: 'youtubeSession',
    secure: false,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}
export async function getUser(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');
  if (!userId) return null;
  return getUserById(userId);
}
export async function requireUser(request: Request) {
  const user = await getUser(request);
  if (!user) {
    throw redirect('/login');
  }
  return user;
}
export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}