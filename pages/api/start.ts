// endpoint to start the bot

import { NextApiRequest, NextApiResponse } from "next";
import { getAccount } from "../../server/alpaca";
import BotService from "../../server/bot/botService";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body = await JSON.parse(req.body);
    const { email } = body;
    const bot = BotService();
    if(email === "start") {
        await getAccount().then((account) => {
        console.log(account)
    });
        bot.start();
    }
    else{
        console.log('stop')
        bot.stop();
    }
    res.status(200).json({ message: "success" });
}