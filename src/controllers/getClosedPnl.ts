import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { sendMessage } from "../utils";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function getClosedPnl() {
  try {
    const result = await client.getClosedPnL({ category: "linear", limit: 1 });
    if (result.result.list.length > 0) {
      const firstOrder = result.result.list[0];
      let message = `Closed Pnl`;
      message += `\n Order Id: \` ${firstOrder.orderId}\``;
      message += `\n Symbol: \`${firstOrder.symbol}\``;
      message += `\n Order Type: \`${firstOrder.orderType}\``;
      message += `\n Side: \`${firstOrder.side}\``;
      message += `\n Pnl: \` ${firstOrder.closedPnl}\``;
      sendMessage(message);
    } else {
      console.log("No closed PnL orders found.");
    }
  } catch (error) {
    console.log(error);
  }
}

export { getClosedPnl };
