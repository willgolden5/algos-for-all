import { AlpacaClient } from "@master-chief/alpaca";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
   
   const alpaca =  new AlpacaClient({
        credentials: {
            key: process.env.ALPACA_API_KEY as string,
            secret: process.env.ALPACA_API_SECRET as string,
            paper: true,
        },
        rate_limit: true,
    })
    const account = await alpaca.getAccount();
    res.status(200).json({ message: "success", account: account });
}