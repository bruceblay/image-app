// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs/promises';
import path from 'path';
import { readMeta, writeMeta, UPLOADS_DIR } from '../images';

export default async function ImageId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let { query, method, body } = req;

    if (method === 'GET') { // fetch single image.  needed?
        const images = await readMeta();
        const image = images.find((img) => img.id === query.imageId);
        if (!image) return res.status(404).json({ error: 'Not found' });

        const data = await fs.readFile(path.join(UPLOADS_DIR, image.filename));
        res.setHeader('Content-Type', image.mimetype);
        return res.send(data);
    } else if (method === 'DELETE') {
        const images = await readMeta();
        const image = images.find((img) => img.id === query.imageId);

        if (!image) return res.status(404).json({ error: 'Not found' });

        await fs.unlink(path.join(UPLOADS_DIR, image.filename));
        await writeMeta(images.filter((img) => img.id !== image.id));
        return res.status(204).end();
    }

    return res.status(405).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
  
}
