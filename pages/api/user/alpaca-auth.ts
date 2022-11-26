// api route for creating user with prisma

import { NextApiRequest, NextApiResponse } from "next";
import { isDevelopment } from "../../../utils/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// if the user doesnt contain an alpaca oauth token, create one
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO: enable this for real $ trading. Only set to paper at the moment.
  const { code } = JSON.parse(req.body);
  const bodyParams = {
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.ALPACE_CLIENT_ID as string,
      client_secret: process.env.ALPACA_CLIENT_SECRET as string,
      redirect_uri: isDevelopment ? 'http://localhost:3000/' : 'https://blackboxquant.com/',
  }

  
  try{
    const response = await fetch("https://api.alpaca.markets/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bodyParams)
    });

    prisma.user
    const data = await response.json();
    console.log('data', data)
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
}