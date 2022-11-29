// api route for creating user with prisma

import { AlpacaClient } from "@master-chief/alpaca";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'cookies-next'
import { isDevelopment } from "../../../utils/utils";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  

  const { code } = JSON.parse(req.body);
  const bodyParams = {
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.ALPACE_CLIENT_ID as string,
      client_secret: process.env.ALPACA_CLIENT_SECRET as string,
      redirect_uri: isDevelopment ? 'http://localhost:3000/signup' : 'https://blackboxquant.com/signup',
  }

  try{
    const response = await fetch("https://api.alpaca.markets/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bodyParams)
    });
    const data = await response.json();
    const alpaca = new AlpacaClient({
      credentials: {
          access_token: data.access_token,
          paper: true,
      },
      rate_limit: true,
  })
    const account = await alpaca.getAccount();
    // if account exists, set the cookie
    const existingEntry = await prisma.user.findUnique({
      where: {alpaca_id: account.account_number},
    })

    if(existingEntry) {
      setCookie('account', existingEntry)
      res.status(309).json({message: "account already exists", account: existingEntry});
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
}