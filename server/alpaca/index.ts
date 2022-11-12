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

export const createOrder = async (symbol: string, qty: number, side: string, type: string, time_in_force: string) => {
    const order = await alpaca.createOrder({
        symbol: symbol,
        qty: qty,
        side: side,
        type: type,
        time_in_force: time_in_force,
      });
      return order;
};
