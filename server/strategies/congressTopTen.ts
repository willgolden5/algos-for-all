import { CancelOrder, AlpacaClient } from "@master-chief/alpaca";
import { awaitMarketOpen } from "../alpaca";


const MINUTE = 60000
const FIFTEEN_MINUTES = 15; 
let lastOrder: CancelOrder | undefined = undefined;

export const runCongressTopTen = async ( alpaca: AlpacaClient) => {
    console.log("Waiting for market to open...");
    await awaitMarketOpen(alpaca);
    console.log("Market Opened.");
    console.log(`Running Congress Top Ten Algorithm`);
    // TODO: run algorithm here
};