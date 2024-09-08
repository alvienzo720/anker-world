import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function getKline(symbol: string, interval: string, category: any) {
  let { retCode, retMsg, result } = await client.getKline({
    symbol: "BTCUSDT",
    interval: "1",
    category: "linear",
  });
  if (retCode === 0) {
    console.log(result);
    return result;
  } else {
    console.log(retCode, retMsg);
  }
}

export { getKline };
