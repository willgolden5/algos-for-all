// endpoint to start the bot

import { NextApiRequest, NextApiResponse } from "next";
import { AlpacaClient } from '@master-chief/alpaca';
import { runMeanReversion } from "../../server/strategies/meanReversion";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body = await JSON.parse(req.body);
    const { algo, symbol, apiKey, apiSecret } = body;
    if(algo === "mean-reversion") {
        const alpaca = new AlpacaClient({
            credentials: {
                key: process.env.ALPACA_API_KEY ? process.env.ALPACA_API_KEY : apiKey,
                secret: process.env.ALPACA_API_SECRET ? process.env.ALPACA_API_SECRET : apiSecret,
                paper: true,
            },
            rate_limit: true,
        })
        await runMeanReversion(symbol, alpaca);
        res.status(200).json({ message: "success" });
    }
}