// api route for creating user with prisma

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { AlpacaClient } from '@master-chief/alpaca';
import {z} from "zod";

const schema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  accessToken: z.string(),
});

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await JSON.parse(req.body);
  const { email, firstName, lastName, phone, accessToken } = schema.parse(body);
 
  const alpaca = new AlpacaClient({
    credentials: {
        access_token: accessToken as string,
        paper: true,
    },
    rate_limit: true,
  })
  const account = await alpaca.getAccount();

  const accountData = {
    alpaca_id: account.account_number as string,
    email: email as string,
    first_name: firstName as string,
    last_name: lastName as string,
    phone: phone as string,
    alpaca_token: accessToken as string,
    
  }

  //if it already exists login the user, if not create the user

  const existingEntry = await prisma.user.findUnique({
    where: {alpaca_id: account.account_number},
  })

  if(existingEntry) {
    res.status(309).json({message: "account already exists", account: existingEntry});
  } else {
    const createUser = await prisma.user.upsert({
    create: accountData,
    update: accountData,
    where: { alpaca_id: account.account_number },
    })
    try{
      res.status(200).json(createUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: err});
    };
  }
  
  

}