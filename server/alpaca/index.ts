import { AlpacaClient } from '@master-chief/alpaca';
import { OrderSide } from "@master-chief/alpaca/@types/entities";

const options = {
    credentials: {
    key: process.env.ALPACA_API_KEY as string,
    secret: process.env.ALPACA_API_SECRET as string,
    paper: true,
},
    rateLimit: true,
};

export const alpaca = new AlpacaClient(options);
const MINUTE = 60000

//get account info
export const getAccount = async () => {
    const account = await alpaca.getAccount()
    return account;
};

//wait for market to open
export const awaitMarketOpen = async () => {
    let timeToClose = 0;
    return new Promise<void>(resolve => {
        const check = async () => {
            try {
                const clock = await alpaca.getClock();
                if (clock.is_open) {
                    resolve();
                }
                else {
                    const openTime = await getOpenTime();
                    const currTime = await getCurrentTime();

                    timeToClose = Math.floor((openTime - currTime) / 1000 / 60)
                    let timeString = (numberToHourMinutes(timeToClose) + ' until market open.');
                    console.log(timeString);
                    setTimeout(check, MINUTE);
                }
            } catch (err) {
                console.log(err);
            }
        };
        check();
    })
};

const numberToHourMinutes = (number: number): string => {
    const hours = number / 60
    const realHours = Math.floor(hours)
    const minutes = (hours - realHours) * 60
    const realMinutes = Math.round(minutes)
    return realHours + ' hour(s) and ' + realMinutes + ' minute(s)'
  }

// Submit an order if quantity is above 0.
export const submitOrder = async (symbol: string, quantity: number, side: OrderSide) => {
    if(quantity > 0) {
    try {
    const order = await alpaca.placeOrder({
        symbol: symbol,
        qty: quantity,
        side: side,
        type: 'market',
        time_in_force: 'day',
      });
      return order;
    } catch (err) {
      console.log(err);
    }
    } else {
        console.log(`Quantity is <=0, order of | ${quantity} ${symbol} ${side} | not sent.`)
    }
};

// submit a limit order if quantity is above 0
export const submitLimitOrder = async (symbol: string, quantity: number, side: OrderSide, limitPrice: number) => {
    if(quantity > 0) {
    try {
    const order = await alpaca.placeOrder({
        symbol: symbol,
        qty: quantity,
        side: side,
        type: 'limit',
        time_in_force: 'day',
        limit_price: limitPrice
      });
      return order;
    } catch (err) {
      console.log(err);
    }
    } else {
        console.log(`Quantity is <=0, order of | ${quantity} ${symbol} ${side} | not sent.`)
    }
}

//get market open time
export const getOpenTime = async () => {
    const clock = await alpaca.getClock();
    return new Date(clock.next_open.toString().substring(0, clock.next_close.toString().length - 6)).getTime();
}

//get market close time
export const getCloseTime = async () => {
    const clock = await alpaca.getClock();
    return new Date(clock.next_close.toString().substring(0, clock.next_close.toString().length - 6)).getTime();
};

//get current time
export const getCurrentTime = async () => {
    const clock = await alpaca.getClock();
    return new Date(clock.timestamp.toString().substring(0, clock.timestamp.toString().length - 6)).getTime();
};

//get time to market close
export const getTimeToClose = async () => {
    const closingTime = await getCloseTime();
    const currentTime = await getCurrentTime();
    return Math.abs(closingTime - currentTime)
};

//get all open orders
export const getOpenOrders = async () => {
    const orders = await alpaca.getOrders({
        status: 'open',
    });
    return orders;
};

//cancel all existing orders
export const cancelExistingOrders = async () => {
    let orders;
    try {
        orders = await alpaca.getOrders({
            status: 'open',
            direction: 'asc',
        });
        if(orders.length > 0) {
            try{
            orders.map(order => {
                const cancelParams = {
                    order_id: order.id,
                };
                return alpaca.cancelOrder(cancelParams);
            })
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('No open orders to cancel.')
        }
    } catch (err) {
        console.log(err);
    }
};
