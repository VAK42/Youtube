import { requireUser } from '../sessions.server';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Form } from 'react-router';
import type { Route } from './+types/settings';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Settings - Youtube" }];
}
export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  return { user };
}
export default function Settings({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex gap-8">
        <aside className="w-48 flex flex-col gap-1">
          <Button variant="ghost" className="justify-start bg-zinc-800 text-white font-medium">Account</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Notifications</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Playback</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Downloads</Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">Privacy</Button>
        </aside>
        <main className="flex-1 space-y-8">
          <section>
            <h2 className="text-lg font-bold mb-4">Your Channel</h2>
            <div className="flex items-center gap-4 mb-4">
              <img src={user.avatarUrl || 'https://placehold.co/100x100'} alt={user.username} className="w-16 h-16 rounded-full" />
              <div>
                <div className="font-bold text-lg">{user.username}</div>
                <div className="text-zinc-400">{user.email}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="text-blue-400 hover:text-blue-300">Channel Status And Features</Button>
              <Button variant="secondary" className="text-blue-400 hover:text-blue-300">Create A New Channel</Button>
              <Button variant="secondary" className="text-blue-400 hover:text-blue-300">View Advanced Settings</Button>
            </div>
          </section>
          <hr className="border-zinc-800" />
          <section>
            <h2 className="text-lg font-bold mb-4">Account</h2>
            <Form className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input defaultValue={user.username} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input defaultValue={user.email} disabled className="opacity-50" />
              </div>
              <Button>Save Changes</Button>
            </Form>
          </section>
        </main>
      </div>
    </div>
  )
}