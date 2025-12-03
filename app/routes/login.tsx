import { Form, Link, useNavigation } from 'react-router';
import { createUserSession, verifyLogin } from '../sessions.server';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { Route } from './+types/login';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Login - Youtube" }];
}
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return { error: "Email & Password Are Required." };
  }
  const user = await verifyLogin(email, password);
  if (!user) {
    return { error: "Invalid Email Or Password." };
  }
  return createUserSession(user.id, "/");
}
export default function Login({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center mb-4">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
          </div>
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-zinc-400 mt-2">To Continue To YouTube</p>
        </div>
        <Form method="post" className="space-y-4">
          <div>
            <Input name="email" type="email" placeholder="Email" required autoFocus className="bg-black border-zinc-700" />
          </div>
          <div>
            <Input name="password" type="password" placeholder="Password" required className="bg-black border-zinc-700" />
          </div>
          {actionData?.error && (
            <div className="text-red-500 text-sm font-medium">{actionData.error}</div>
          )}
          <div className="flex justify-between items-center mt-8">
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 text-sm font-medium">Create Account</Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Next"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}