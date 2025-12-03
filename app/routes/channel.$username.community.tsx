import { Form, useLoaderData } from 'react-router';
import { getPosts, createPost } from '../models/post.server';
import { requireUser } from '../sessions.server';
import { Button } from '../components/ui/Button';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import type { Route } from './+types/channel.$username.community';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Youtube" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  const posts = getPosts(params.username || "");
  return { posts };
}
export async function action({ request, params }: Route.ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const content = formData.get("content") as string;
  createPost(user.id, content);
  return { success: true };
}
export default function ChannelCommunity({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 border border-zinc-700 rounded-lg p-4 bg-[#0f0f0f]">
        <Form method="post" className="flex flex-col gap-4">
          <textarea
            name="content"
            placeholder="What's On Your Mind?"
            className="w-full bg-transparent border-b border-zinc-700 p-2 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <Button type="submit">Post</Button>
          </div>
        </Form>
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post: any) => (
          <div key={post.id} className="border border-zinc-700 rounded-lg p-4 bg-[#0f0f0f]">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-zinc-700" />
              <div>
                <div className="font-bold text-sm">{post.author}</div>
                <div className="text-xs text-zinc-400">{post.date}</div>
              </div>
            </div>
            <p className="mb-4 text-sm">{post.content}</p>
            {post.type === 'poll' && (
              <div className="flex flex-col gap-2 mb-4">
                {post.options?.map((option: string, index: number) => (
                  <div key={index} className="border border-zinc-700 rounded p-2 text-sm hover:bg-zinc-800 cursor-pointer transition-colors">
                    {option}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4 text-zinc-400">
              <Button variant="ghost" size="sm" className="gap-2 hover:text-white">
                <ThumbsUp className="w-4 h-4" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:text-white">
                <ThumbsDown className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:text-white">
                <MessageSquare className="w-4 h-4" /> {post.comments}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}