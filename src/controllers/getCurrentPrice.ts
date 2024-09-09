import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function getCurrentPrice(symbol: string, category: any) {
  try {
    const { result, retCode, retMsg } = await client.getTickers({
      symbol,
      category,
    });
    const lastPrice = result.list[0]?.lastPrice;
    // console.log("Last price", lastPrice);
    if (retCode === 0) {
      return lastPrice ? parseFloat(lastPrice) : null;
    }
  } catch (error) {
    console.log(error);
  }
}

export { getCurrentPrice };
