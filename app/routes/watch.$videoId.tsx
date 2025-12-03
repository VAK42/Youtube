import { Link, useSubmit } from 'react-router';
import { getVideoById, getVideos } from '../models/video.server';
import { getCommentsForVideo } from '../models/comment.server';
import { VideoCard } from '../components/VideoCard';
import { CustomVideoPlayer } from '../components/CustomVideoPlayer';
import { SaveToPlaylistModal } from '../components/SaveToPlaylistModal';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, List, X } from 'lucide-react';
import { useState } from 'react';
import type { Route } from './+types/watch.$videoId';
export function meta({ data }: Route.MetaArgs) {
  return [{ title: data?.video ? `${data.video.title} - Youtube` : "Watch - Youtube" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  const { videoId } = params;
  if (!videoId) throw new Response("Not Found", { status: 404 });
  const video = getVideoById(videoId);
  if (!video) throw new Response("Not Found", { status: 404 });
  const comments = getCommentsForVideo(videoId);
  const relatedVideos = getVideos(10);
  return { video, comments, relatedVideos };
}
export default function Watch({ loaderData }: Route.ComponentProps) {
  const { video, comments, relatedVideos } = loaderData;
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { addToast } = useToast();
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      addToast('Removed Like', 'info');
    } else {
      setLiked(true);
      setDisliked(false);
      addToast('Liked!', 'success');
    }
  };
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      addToast('Removed Dislike', 'info');
    } else {
      setDisliked(true);
      setLiked(false);
      addToast('Disliked', 'info');
    }
  };
  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    addToast(subscribed ? 'Unsubscribed' : 'Subscribed!', subscribed ? 'info' : 'success');
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link Copied To Clipboard!', 'success');
    setShowShareModal(false);
  };
  const postComment = () => {
    if (!commentText.trim()) return;
    addToast('Comment Posted!', 'success');
    setCommentText('');
  };
  return (
    <div className={`flex flex-col lg:flex-row gap-6 p-6 ${isTheaterMode ? 'max-w-full' : 'max-w-[1800px]'} mx-auto`}>
      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <CustomVideoPlayer
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            autoPlay
            onTheaterMode={setIsTheaterMode}
          />
        </div>
        <h1 className="text-xl font-bold mb-2">{video.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Link to={`/channel/${video.username}`} className="flex items-center gap-2">
              <img src={video.avatarUrl || 'https://placehold.co/100x100'} alt={video.username} className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span className="font-semibold">{video.username}</span>
                <span className="text-xs text-zinc-400">1.2M Subscribers</span>
              </div>
            </Link>
            <Button
              variant="secondary"
              onClick={handleSubscribe}
              className={`rounded-full font-medium ${subscribed ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-800 rounded-full overflow-hidden">
              <Button
                variant="ghost"
                onClick={handleLike}
                className={`rounded-none px-4 hover:bg-zinc-700 border-r border-zinc-700 gap-2 ${liked ? 'text-blue-400' : ''}`}
              >
                <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? '12.1K' : '12K'}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleDislike}
                className={`rounded-none px-4 hover:bg-zinc-700 ${disliked ? 'text-blue-400' : ''}`}
              >
                <ThumbsDown className={`w-5 h-5 ${disliked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowShareModal(true)}
              className="rounded-full bg-zinc-800 hover:bg-zinc-700 gap-2"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowPlaylistModal(true)}
              className="rounded-full bg-zinc-800 hover:bg-zinc-700 gap-2"
            >
              <List className="w-5 h-5" />
              <span>Save</span>
            </Button>
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0 bg-zinc-800 hover:bg-zinc-700">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4 mb-6">
          <div className="flex gap-2 text-sm font-medium mb-2">
            <span>{video.views} Views</span>
            <span>1 Year Ago</span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{video.description}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-sm font-medium">U</div>
            <div className="flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add A Comment..."
                className="w-full bg-transparent border-b border-zinc-700 focus:border-white outline-none pb-2 text-sm"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCommentText('')}
                  disabled={!commentText}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={postComment}
                  disabled={!commentText}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-3">
                <img src={comment.avatarUrl || 'https://placehold.co/100x100'} alt={comment.username} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">@{comment.username}</span>
                    <span className="text-xs text-zinc-400">2 Days Ago</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><ThumbsUp className="w-4 h-4" /></Button>
                    <span className="text-xs text-zinc-400">12</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><ThumbsDown className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 rounded-full text-xs">Reply</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {relatedVideos.map((v: any) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
      {showPlaylistModal && (
        <SaveToPlaylistModal
          videoId={video.id}
          onClose={() => setShowPlaylistModal(false)}
        />
      )}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowShareModal(false)}>
          <div className="bg-[#282828] rounded-xl w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Share</h3>
              <button onClick={() => setShowShareModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={typeof window !== 'undefined' ? window.location.href : ''}
                readOnly
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm"
              />
              <Button onClick={handleShare}>Copy</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}