// api route for creating user with prisma

import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
res.status(401).json({ message: "unauthorized" });
}