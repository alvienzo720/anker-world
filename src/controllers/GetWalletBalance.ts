import { BotConfigs } from "../config";
import { GetWalletBalanceParamsV5, RestClientV5 } from "bybit-api";
import { sendMessage } from "../utils";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function getWalletBalance(ctx: GetWalletBalanceParamsV5) {
  try {
    const result = await client.getWalletBalance({
      coin: "USDT",
      accountType: "CONTRACT",
    });

    if (
      result.retCode === 0 &&
      result.result.list &&
      result.result.list.length > 0
    ) {
      const USDT = result.result.list[0].coin.find(
        (c: any) => c.coin === "USDT"
      );

      if (USDT) {
        let message = `*💰 USDT Balance 💰*`;
        message += `\n📊 Available Balance: \`${USDT.availableToWithdraw}\``;
        message += `\n💼 Wallet Balance: \`${USDT.walletBalance}\``;
        message += `\n✅ Realised PNL: \`${USDT.cumRealisedPnl}\``;
        message += `\n⏳ Unrealised PNL: \`${USDT.unrealisedPnl}\``;
        message += `\n📈 Cumulative Realised PNL: \`${USDT.cumRealisedPnl}\``;

        await sendMessage(message);
      } else {
        await sendMessage("USDT balance not found.");
      }
    } else {
      await sendMessage("Failed to fetch wallet balance.");
    }
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    await sendMessage("An error occurred while fetching the wallet balance.");
  }
}

export { getWalletBalance };
