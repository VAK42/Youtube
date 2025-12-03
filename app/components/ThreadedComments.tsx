import { useState } from 'react';
import { Button } from './ui/Button';
import { ThumbsUp, ThumbsDown, CornerDownRight } from 'lucide-react';
import { useToast } from './ui/Toast';
interface Comment {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
  replies: Comment[];
}
interface ThreadedCommentsProps {
  videoId: string;
  initialComments: Comment[];
}
export function ThreadedComments({ videoId, initialComments }: ThreadedCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const { addToast } = useToast();
  const addReply = (parentId: string) => {
    if (!replyText.trim()) return;
    const newReply: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: replyText,
      likes: 0,
      timestamp: 'Just Now',
      replies: [],
    };
    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: addReplyToComment(comment.replies) };
        }
        return comment;
      });
    };
    setComments(addReplyToComment(comments));
    setReplyText('');
    setReplyingTo(null);
    addToast('Reply Posted!', 'success');
  };
  const CommentItem = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => (
    <div className={`${depth > 0 ? 'ml-12 mt-4' : 'mb-4'}`}>
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
          {comment.author[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author}</span>
            <span className="text-xs text-zinc-400">{comment.timestamp}</span>
          </div>
          <p className="text-sm mb-2">{comment.content}</p>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <button className="flex items-center gap-1 hover:text-white">
              <ThumbsUp className="w-3 h-3" />
              <span>{comment.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-white">
              <ThumbsDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="hover:text-white flex items-center gap-1"
            >
              <CornerDownRight className="w-3 h-3" />
              Reply
            </button>
          </div>
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Add A Reply..."
                className="flex-1 bg-transparent border-b border-zinc-700 focus:border-white outline-none pb-2 text-sm"
                autoFocus
              />
              <Button size="sm" onClick={() => addReply(comment.id)}>Reply</Button>
              <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>Cancel</Button>
            </div>
          )}
          {comment.replies.length > 0 && (
            <div className="mt-4 border-l-2 border-zinc-800 pl-4">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}