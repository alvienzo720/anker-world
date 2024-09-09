import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { getCurrentPrice } from "./getCurrentPrice";
import { MakeOrder } from "./makeOrder";
import { OrderParamsV5 } from "bybit-api"; // Added import for OrderParamsV5
import { sendMessage } from "../utils";
import { getPnl } from "./getPnl";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function Buy() {
  try {
    const price = Number(await getCurrentPrice("BTCUSDT", "linear"));
    const params: OrderParamsV5 = {
      category: "linear",
      symbol: "BTCUSDT",
      side: "Buy",
      orderType: "Limit",
      qty: "0.005",
      price: price.toString(),
      timeInForce: "GTC",
      reduceOnly: false,
      closeOnTrigger: false,
      positionIdx: 0,
    };
    params.price =
      params.side === "Buy"
        ? (price - 0.05).toString()
        : (price + 0.05).toString();
    // console.log(params);
    const result = await MakeOrder(params);
    if (result) {
      // console.log("Result", result);
      const { retCode, retMsg } = result;
      let message = `Placing an Order now`;
      message = `\n OrderID: \`${result.result.orderId}\``;
      message += `\n Symbol: \`${params.symbol}\``;
      message += `\n Order Id: \` ${params.price}\``;
      message += `\n Oty: \`${params.qty}\``;
      message += `\n Side: \`${params.side}\``;
      sendMessage(message);
      getPnl.start();
      // Handle retCode and retMsg here
    }
  } catch (error) {
    console.log(error);
  }
}

export { Buy };
