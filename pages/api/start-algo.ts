// endpoint to start the bot

import { NextApiRequest, NextApiResponse } from "next";
import { AlpacaClient } from '@master-chief/alpaca';
import { runMeanReversion } from "../../server/strategies/meanReversion";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body = await JSON.parse(req.body);
    const { algo, symbol, accessToken } = body;
    if(algo === "mean-reversion") {
        const alpaca = new AlpacaClient({
            credentials: {
                access_token: accessToken,
                paper: true,
            },
            rate_limit: true,
        })
        await runMeanReversion(symbol, alpaca);
    }
    res.status(200).json({ message: "success" });
}