// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function ImageId(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    let { query, method, body } = req;

    if (method === 'GET') { // fetch single image

    } else if (method === 'DELETE') {

    } else {
        res.status(405).end();
    }
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
}
