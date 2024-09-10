import { RestClientV5, OrderParamsV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { getCurrentPrice } from "./getCurrentPrice";
import { MakeOrder } from "./makeOrder";
import { sendMessage } from "../utils";
import { getClosedPnl } from "./getClosedPnl";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const sell = async (maxRetries: number = 100) => {
  let retryCount = 0;

  while (retryCount < maxRetries) {
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
        price: (price + 0.05).toString(), // Always set price above current price for Sell
        positionIdx: 0,
      };

      console.log(
        `Attempt ${
          retryCount + 1
        }: Placing sell order with price above current price please wait ...`
      );
      const order = await MakeOrder(params);

      if (order && order.retCode === 0) {
        // Assuming retCode 0 means success
        let message = `Sell Order placed successfully after ${
          retryCount + 1
        } attempts`;
        message += `\n OrderID: \`${order.result.orderId}\``;
        message += `\n Symbol: \`${params.symbol}\``;
        message += `\n Order Price: \`${params.price}\``;
        message += `\n Qty: \`${params.qty}\``;
        message += `\n Side: \`${params.side}\``;
        sendMessage(message);
        getClosedPnl();
        return; // Exit the function if order is placed successfully
      } else {
        console.log(`Attempt ${retryCount + 1} failed. Retrying...`);
        retryCount++;
        await sleep(20000); // Wait for 20 seconds before next attempt
      }
    } catch (error) {
      console.error(`Error on attempt ${retryCount + 1}:`, error);
      retryCount++;
      await sleep(20000); // Wait for 20 seconds before next attempt
    }
  }

  console.log("Maximum retries reached. Failed to place the sell order.");
  sendMessage("Failed to place the sell order after maximum retries.");
};
