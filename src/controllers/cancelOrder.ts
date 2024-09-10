import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { sendMessage } from "../utils";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function CancelOrder(category: any) {
  try {
    const result = await client.cancelAllOrders({ category });
    console.log("Order Closed", result);
    if (result.retCode === 0) {
      let message = `Order Canceled`;
      message += `\n Order Id: \` ${result.result.list[0].orderId}\``;
      sendMessage(message);
    }
  } catch (error) {
    console.log(error);
  }
}

export { CancelOrder };
