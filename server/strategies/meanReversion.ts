import { awaitMarketOpen, alpaca, getCurrentTime, getTimeToClose, submitOrder, getOpenTime, submitLimitOrder, getAccount, cancelExistingOrders } from "../alpaca";
import  { Calendar, BarsTimeframe, PageOfBars, CancelOrder, Bar } from "@master-chief/alpaca";


const MINUTE = 60000
const TWENTY_MINUTES = 20
let lastOrder: CancelOrder | undefined = undefined;

//simple mean reversion algorithm using the alpaca api
export const runMeanReversion = async (symbol: string) => {
    console.log("Waiting for market to open...");
    await cancelExistingOrders();
    await awaitMarketOpen();
    console.log("Market Opened.");
    console.log(`Running Mean Reversion Algorithm on ${symbol}`);
    await getAvgPricesOverLastXMinutes(TWENTY_MINUTES, symbol)
};

// get the running average of prices over the last x minutes, waiting until we have 20 bars from the market open.
const getAvgPricesOverLastXMinutes = async (minutes: number, symbol: string) => {
    const barsPromise = new Promise(resolve => {
        const barChecker = setInterval(async () => {
            await alpaca.getCalendar().then(async (res) => {
                const open = res && res[0] as Calendar;
                const marketOpen = new Date(open.open);
                const currTime = await getCurrentTime();
                const barsRes = alpaca.getBars({
                    symbol: symbol,
                    start: marketOpen,
                    end: new Date(currTime),
                    timeframe: '1Min',
                });
                const bars: PageOfBars = await barsRes;
                if (bars && bars.bars && bars.bars.length >= minutes) {
                    clearInterval(barChecker);
                    resolve(bars);
                }
            })
        }, MINUTE);
    })

    //Rebalance our portfolio every minute based off running average data
    const spin = setInterval(async () => {
        if(lastOrder !== undefined) {
            await alpaca.cancelOrder(lastOrder as CancelOrder)
            .catch((err) => console.log(err));
        }

        const INTERVAL = 15 // minutes
        const timeToClose = await getTimeToClose();
        if(timeToClose < MINUTE * INTERVAL) {
            console.log("Market closing soon.  Closing positions.");
            try{
                await alpaca.getPosition({symbol: symbol})
                .then(async (position) => {
                    const quantity = position.qty;
                    await submitOrder(
                        symbol,
                        quantity,
                        'sell',
                    )
                    .catch((err) => console.log(err, "Error closing positions"));
                });
            } catch (err) {
                console.log(err);
            }
            clearInterval(spin)
            console.log("Sleeping until market close (15 minutes).");
            setTimeout(() => {
                // Run script again after market close for next trading day.
                runMeanReversion(symbol)
              }, 60000 * 15)
        } else {
            await rebalance(symbol)
        }
    }, MINUTE);
};

const rebalance = async (symbol: string) => {
    let positionQuantity: number = 0;
    let positionValue: number | null = 0;
    let runningAverage: number = 0; 

    //get our position if any
    try {
        await alpaca.getPosition({symbol: symbol}).then(resp => {
            positionQuantity = resp.qty
            positionValue = resp.market_value
            })
    } catch (err) {
        console.log(err);
    }
    const marketOpen = await getOpenTime();
    const currTime = await getCurrentTime();
    // get the new updated price and running average.
    const bars = await alpaca.getBars({
        symbol: symbol,
        start: new Date(marketOpen),
        end: new Date(currTime),
        timeframe: '1Min',
        limit: 20,
    }) as PageOfBars;

    const currBar: Bar = bars && bars.bars[bars.bars.length - 1] as Bar
    const currPrice = currBar.c;
    bars.bars.map(bar => {
        runningAverage += bar.c;
    })
    runningAverage /= bars.bars.length;

    if(currPrice > runningAverage) {
        //sell our position if th eprice is above the running average
        if(positionQuantity > 0) {
            await submitLimitOrder(
                symbol,
                positionQuantity,
                'sell',
                currPrice
            )
            .catch((err) => console.log(err));
        } else {
            console.log("No position to sell");
        }
    } else if (currPrice < runningAverage) {
        // determine optimal amount of shares based on portfolio and market data.
        let buyingPower;
        let portfolioValue = 0;

        await getAccount()
                .then(account => {
                    portfolioValue = account.portfolio_value;
                    buyingPower = account.buying_power;
                })
                .catch((err) => console.log(err));

        const portfolioShare = ((runningAverage - currPrice) / currPrice) * 200;
        const targetPositionValue = portfolioValue * portfolioShare;
        let amountToAdd = targetPositionValue - positionValue as number;

        if (amountToAdd > 0) {
            if (buyingPower && amountToAdd > buyingPower)  {
                amountToAdd = buyingPower;
            }
            const quantityToBuy = Math.floor(amountToAdd / currPrice);
            const order = await submitLimitOrder(
                symbol,
                quantityToBuy,
                'buy',
                currPrice
            )
            lastOrder = order && {order_id: order.id};
        } else {
            amountToAdd *= -1;
            let quantityToSell = Math.floor(amountToAdd / currPrice);
            if(quantityToSell > positionQuantity) {
                quantityToSell = positionQuantity;
            }
            const order = await submitLimitOrder(symbol, quantityToSell, 'sell', currPrice);
            lastOrder = order && {order_id: order.id};
        }
        } else {
            console.log("Position already exists");
        }
    }
}