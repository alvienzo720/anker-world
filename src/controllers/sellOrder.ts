import { RestClientV5, OrderParamsV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { getCurrentPrice } from "./getCurrentPrice";
import { MakeOrder } from "./makeOrder";
import { sendMessage } from "../utils";
import { getPnl } from "./getPnl";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

export const sell = async () => {
  try {
    const price = Number(await getCurrentPrice("BTCUSDT", "linear"));
    const params: OrderParamsV5 = {
      category: "linear",
      symbol: "BTCUSDT",
      side: "Sell",
      qty: "0.005",
      orderType: "Limit",
      timeInForce: "GTC",
      reduceOnly: true,
      closeOnTrigger: false,
      price: (price + 0.05).toString(),
      positionIdx: 0,
    };

    const order = await MakeOrder(params);
    if (order) {
      // console.log("Sell order placed:", order);
      // sendMessage(`Sell order placed: ${JSON.stringify(order)}`);
      let message = `Sell Order Placed`;
      message = `\n OrderID: \`${order.result.orderId}\``;
      message += `\n Symbol: \`${params.symbol}\``;
      message += `\n Order Price: \` ${params.price}\``;
      message += `\n Oty: \`${params.qty}\``;
      message += `\n Side: \`${params.side}\``;
      sendMessage(message);
    } else {
      sendMessage("An error might have occurred");
    }
  } catch (error) {
    console.error("Error placing sell order:", error);
    sendMessage(`Error placing sell order: ${error}`);
  }
};
