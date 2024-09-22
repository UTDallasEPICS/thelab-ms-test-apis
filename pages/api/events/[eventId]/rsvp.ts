import type { NextApiRequest, NextApiResponse } from 'next'
import type { EventStore, UserStore } from "@/pages/api/data/dataTypes";
import { promises as fs } from 'fs';
import { console } from 'inspector/promises';
 
type Data = {
    userID: number;
    eventID: number;
  };


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data|null>) {
  if (req.method === 'POST') {
    console.log(req.headers);
    const users:UserStore = JSON.parse(await fs.readFile(process.cwd() + '/pages/api/data/userStore.json', 'utf8'))
    const eventStore: EventStore = JSON.parse(await fs.readFile(process.cwd() + '/pages/api/data/eventStore.json', 'utf8'));
    const authType = (req.headers.authorization || '').split(' ')[0];
    const authBody = (req.headers.authorization || '').split(' ')[1];
    const eventIdStr = req.query.eventId;
    const eventId = parseInt(eventIdStr as string, 10);
    console.log(eventId);
    // const eventId = parseInt(router.query.eventId as string, 10);
    console.log(authType);
    console.log(authBody);
    console.log(eventId);
    if (authType === 'Bearer' && authBody) {
        const userID = users.find(user => user.jwt === authBody)?.id || null;
        if (userID && eventStore.find(event => event.id === eventId)) {
            res.status(200).json({ userID: userID , eventID:eventId});
        }
    }
    res.status(400).json(null);
  }
    // Handle any other HTTP method
    res.status(401).json(null);
}