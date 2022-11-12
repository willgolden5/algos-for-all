// endpoint to start the bot

import { NextApiRequest, NextApiResponse } from "next";
import { runMeanReversion } from "../../server/strategies/meanReversion";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body = await JSON.parse(req.body);
    const { algo, symbol } = body;
    if(algo === "mean-reversion") {
        await runMeanReversion(symbol);
    }
    else{
        console.log('stop')
    }
    res.status(200).json({ message: "success" });
}