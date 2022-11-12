import { Order } from "./types";

const Alpaca = require("@alpacahq/alpaca-trade-api");

const options = {
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_API_SECRET,
    paper: true,
  };
const alpaca = new Alpaca(options);

export const getAccount = async () => {
    const account = await alpaca.getAccount()
    return account;
};

// Submit an order if quantity is above 0.
export const submitOrder = async (symbol: string, quantity: number, side: string) => {
    if(quantity > 0) {
    try {
    const order = await alpaca.createOrder({
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
export const submitLimitOrder = async (symbol: string, quantity: number, side: string, limitPrice: number) => {
    if(quantity > 0) {
    try {
    const order = await alpaca.createOrder({
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
    return new Date(clock.next_open.substring(0, clock.next_close.length - 6)).getTime();
}

//get market close time
export const getCloseTime = async () => {
    const clock = await alpaca.getClock();
    return new Date(clock.next_close.substring(0, clock.next_close.length - 6)).getTime();
};

//get current time
export const getCurrentTime = async () => {
    const clock = await alpaca.getClock();
    return new Date(clock.timestamp.substring(0, clock.timestamp.length - 6)).getTime();
};

//get time to market close
export const getTimeToClose = async () => {
    const closingTime = await getCloseTime();
    const currentTime = await getCurrentTime();
    return Math.abs(closingTime - currentTime)
};

//cancel all existing orders
export const cancelExistingOrders = async () => {
    let orders: Order[];
    try {
        orders = await alpaca.getOrders({
            status: 'open',
            direction: 'asc',
        });
        if(orders.length > 0) {
            try{
            orders.map(order => {
                return alpaca.cancelOrder(order.id);
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
