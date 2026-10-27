import fs from 'fs/promises';
import path from 'path';
import { ImageType } from '@/types/Image';

export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
export const META_FILE = path.join(DATA_DIR, 'images.json');

export async function readMeta(): Promise<ImageType[]> {
  try {
    let resp = await fs.readFile(META_FILE, 'utf8');
    let parsed = JSON.parse(resp);
    return parsed;
  } catch {
    return [];
  }
}

export async function writeMeta(images: ImageType[]) {
  await fs.writeFile(META_FILE, JSON.stringify(images, null, 2));
}

let queue = Promise.resolve();

// added to handle race conditions with multi file uploads
export function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn);
  queue = run.then(() => {}, () => {});
  return run;
}