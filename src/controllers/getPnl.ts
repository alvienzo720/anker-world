import { RestClientV5 } from "bybit-api";
import { BotConfigs } from "../config";
import { schedule } from "node-cron";
import { sendMessage } from "../utils";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

export const getPnl = schedule(" */5    *    *    *    *    *", async () => {
  try {
    const result = await client.getPositionInfo({
      symbol: "BTCUSDT",
      category: "linear",
    });

    if (result.retCode === 0 && result.result?.list?.length) {
      let hasOpenPosition = false; // To track if any position is open

      result.result.list.forEach((item: any) => {
        const {
          symbol,
          side,
          size,
          positionValue,
          unrealisedPnl,
          curRealisedPnl,
        } = item;

        // Only proceed if the position is open (size > 0)
        if (parseFloat(size) > 0) {
          hasOpenPosition = true;
          let message = `\nSymbol: ${symbol} | Side: ${side} | Qty: ${size} | Unrealized Pnl: ${unrealisedPnl} Realized Pnl: ${curRealisedPnl}`;
          sendMessage(message);
        }
      });

      // If no open positions are found, log this
      if (!hasOpenPosition) {
        // console.log("You have no open positions.");
      }
    } else {
      // console.log("You have no open positions.");
    }
  } catch (error) {
    console.error("Error fetching position info:", error);
  }
});
