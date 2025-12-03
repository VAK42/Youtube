import { writeAsyncIterableToWritable } from '@react-router/node';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
type UploadHandlerPart = {
  name: string;
  filename?: string;
  contentType: string;
  data: AsyncIterable<Uint8Array>;
};
type UploadHandler = (part: UploadHandlerPart) => Promise<string | null | undefined>;
export const uploadHandler: UploadHandler = async ({ name, filename, contentType, data }) => {
  if (name !== 'videoFile' && name !== 'thumbnailFile') {
    return undefined;
  }
  if (!filename) {
    return undefined;
  }
  const ext = path.extname(filename);
  const newFilename = `${uuidv4()}${ext}`;
  const filePath = path.join(uploadDirectory, newFilename);
  const fileStream = fs.createWriteStream(filePath);
  await writeAsyncIterableToWritable(data, fileStream);
  return `/uploads/${newFilename}`;
}