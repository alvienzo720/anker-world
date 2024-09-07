import { OrderParamsV5, RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { sendMessage } from "../utils";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function MakeOrder(params: OrderParamsV5) {
  try {
    let { result, retCode, retMsg } = await client.submitOrder(params);
    if (retCode === 0) {
      console.log("Result", result);
      return { result, retCode, retMsg };
    } else if (retCode === 130125) {
      sendMessage("You have no position, place more order");
    } else if (retCode === 10001) {
      let message =
        params.side === "Buy"
          ? "Place order with price below current price"
          : "Place order with price above current price";
      sendMessage(message);
    } else {
      console.log(retCode, retMsg);
      throw new Error(retMsg);
    }
  } catch (error) {
    console.log(error);
  }
}

export { MakeOrder };
