import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { getCurrentPrice } from "./getCurrentPrice";
import { MakeOrder } from "./makeOrder";
import { OrderParamsV5 } from "bybit-api";
import { sendMessage } from "../utils";
import { getPnl } from "./getPnl";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Buy(maxRetries: number = 100) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const price = Number(await getCurrentPrice("BTCUSDT", "linear"));
      const params: OrderParamsV5 = {
        category: "linear",
        symbol: "BTCUSDT",
        side: "Buy",
        orderType: "Limit",
        qty: "0.005",
        price: (price - 0.05).toString(), // Always set price below current price for Buy
        timeInForce: "GTC",
        reduceOnly: false,
        closeOnTrigger: false,
        positionIdx: 0,
      };

      console.log(
        `Attempt ${
          retryCount + 1
        }: Placing order with price below current price please wait ...`
      );
      const result = await MakeOrder(params);

      if (result && result.retCode === 0) {
        // Assuming retCode 0 means success
        let message = `Order placed successfully after ${
          retryCount + 1
        } attempts`;
        message += `\n OrderID: \`${result.result.orderId}\``;
        message += `\n Symbol: \`${params.symbol}\``;
        message += `\n Price: \`${params.price}\``;
        message += `\n Qty: \`${params.qty}\``;
        message += `\n Side: \`${params.side}\``;
        sendMessage(message);
        getPnl.start();
        return; // Exit the function if order is placed successfully
      } else {
        console.log(`Attempt ${retryCount + 1} failed. Retrying...`);
        retryCount++;
        await sleep(20000); // Wait for 20 seconds before next attempt
      }
    } catch (error) {
      console.log(`Error on attempt ${retryCount + 1}:`, error);
      retryCount++;
      await sleep(20000); // Wait for 20 seconds before next attempt
    }
  }

  console.log("Maximum retries reached. Failed to place the order.");
  sendMessage("Failed to place the order after maximum retries.");
}

export { Buy };
