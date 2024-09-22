import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserStore } from "@/pages/api/data/dataTypes";
import { promises as fs } from 'fs';

type Data = {
    accessToken: string;
  };

let responseJwt:string|undefined = undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data|null>) {
  const users:UserStore = JSON.parse(await fs.readFile(process.cwd() + '/pages/api/data/userStore.json', 'utf8'));
  if (req.method === 'POST') {
    const { fobid } = req.body;
    console.log(`Received fobid: ${fobid}`);
    fobid !== undefined && (responseJwt= users.find(user => user.id === Number(fobid))?.jwt);
    // Process a POST request
    if (responseJwt) {
        res.status(200).json({ accessToken: responseJwt });
    } else {
        res.status(401).json(null);
    }
  } else {
    // Handle any other HTTP method
    res.status(401).json(null);
  }
}