import { Form, useNavigation, useSubmit } from 'react-router';
import * as ReactRouter from 'react-router';
import { uploadHandler } from '../utils/upload.server';
import { createVideo } from '../models/video.server';
import { requireUser } from '../sessions.server';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Upload as UploadIcon, FileVideo, Image as ImageIcon, X } from 'lucide-react';
import { useState, useRef } from 'react';
import type { Route } from './+types/upload';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Upload Video - Youtube Studio" }];
}
export async function action({ request }: Route.ActionArgs) {
  const user = await requireUser(request);
  const { unstable_composeUploadHandlers: composeUploadHandlers, unstable_createMemoryUploadHandler: createMemoryUploadHandler, unstable_parseMultipartFormData: parseMultipartFormData } = ReactRouter as any;
  const uploadHandlerComposed = composeUploadHandlers(
    uploadHandler,
    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandlerComposed);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoFile") as string;
  const thumbnailUrl = formData.get("thumbnailFile") as string;
  const duration = 120;
  if (!videoUrl) {
    return { error: "Video file is required." };
  }
  createVideo(user.id, title, description, videoUrl, thumbnailUrl, duration);
  return { success: true };
}
export default function Upload({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const submit = useSubmit();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'video') setVideoFile(e.target.files[0]);
      else setThumbnailFile(e.target.files[0]);
    }
  };
  if (actionData?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="bg-green-500/10 text-green-500 p-4 rounded-full mb-4">
          <UploadIcon className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Upload Complete!</h2>
        <p className="text-zinc-400 mb-6">Your Video Has Been Successfully Uploaded.</p>
        <Button onClick={() => window.location.reload()}>Upload Another</Button>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      <Form method="post" encType="multipart/form-data" className="space-y-6" ref={formRef}>
        {!videoFile ? (
          <div
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="bg-zinc-800 p-4 rounded-full mb-4">
              <UploadIcon className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Drag & Drop Video Files To Upload</h3>
            <p className="text-zinc-400 text-sm mb-6">Your Videos Will Be Private Until You Publish Them!</p>
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              className="hidden"
              id="video-upload"
              onChange={(e) => handleFileChange(e, 'video')}
            />
            <label htmlFor="video-upload">
              <Button type="button" onClick={() => document.getElementById('video-upload')?.click()}>
                Select Files
              </Button>
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title (Required)</label>
                <Input name="title" placeholder="Add A Title That Describes Your Video" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Tell Viewers About Your Video"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Thumbnail</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 bg-zinc-900 border border-zinc-700 rounded-md flex items-center justify-center overflow-hidden">
                    {thumbnailFile ? (
                      <img src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-zinc-500" />
                    )}
                  </div>
                  <input
                    type="file"
                    name="thumbnailFile"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                  />
                  <label htmlFor="thumbnail-upload">
                    <Button type="button" variant="secondary" size="sm" onClick={() => document.getElementById('thumbnail-upload')?.click()}>
                      Upload Thumbnail
                    </Button>
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-lg p-4">
                <div className="aspect-video bg-black rounded-md mb-4 flex items-center justify-center">
                  <FileVideo className="w-12 h-12 text-zinc-700" />
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="text-sm font-medium truncate">{videoFile.name}</p>
                    <p className="text-xs text-zinc-400">Video Link</p>
                  </div>
                  <button type="button" onClick={() => setVideoFile(null)} className="text-zinc-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Uploading..." : "Publish"}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}