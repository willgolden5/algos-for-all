// api route for creating user with prisma

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { AlpacaClient } from '@master-chief/alpaca';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = JSON.parse(req.body);
  const alpaca = new AlpacaClient({
    credentials: {
        access_token: data.access_token,
        paper: true,
    },
    rate_limit: true,
  })

  const account = await alpaca.getAccount();
  res.status(200).json({ account });
  // prisma.user.upsert({
  //   where: { alpaca_id: account.account_number },
  //   create: undefined,
  //   update: undefined
  // })
  
}