// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';
import { randomUUID } from 'crypto';
import { readMeta, UPLOADS_DIR, writeMeta, withLock } from '@/lib/images-store';
import { ImageType } from "@/types/Image";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function Images(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let { query, method } = req;
    if (method === 'GET') { // fetch all or search query params
      const search = String(query.search ?? '').toLowerCase();
  
      const images = await readMeta();
      let results = images;
      if (search) {
        results = images.filter((img) => img.originalName.toLowerCase().includes(search))
      }
      let resultsWithUrls = results.map((img) => {
        return {...img, url: `/api/images/${img.id}`};
      });
      return res.status(200).json(resultsWithUrls);
    } else if (method === 'POST') { // new upload
      const form = formidable({
        uploadDir: UPLOADS_DIR,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024,
        filter: ({ mimetype }) => !!mimetype?.startsWith('image/'),
      });
      const [, files] = await form.parse(req);
      const file = files.image?.[0];
      if (!file) {
        return res.status(400). json({ error: 'No image!' });
      }

      const newMeta: ImageType = {
        id: randomUUID(),
        filename: file.newFilename,
        originalName: file.originalFilename ?? file.newFilename,
        mimetype: file.mimetype ?? 'application/octet-stream',
        size: file.size,
        createdAt: new Date().toISOString(),
      };

      // prevents race conditions on multi file post
      await withLock(async () => {
        const images = await readMeta();
        await writeMeta([...images, newMeta]);
      });
      
      return res.status(201).json({ ...newMeta, url: `/api/images/${newMeta.id}`});
    }
    
    res.setHeader("Allow", "GET, POST");
    return res.status(405).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
}
