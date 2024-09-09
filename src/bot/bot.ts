import { Markup, Telegraf } from "telegraf";
import { BotConfigs } from "../config";
import { Buy, getWalletBalance, sell } from "../controllers";
import { sendMessage } from "../utils";
import { getPnl } from "../controllers/getPnl";

const bot = new Telegraf(BotConfigs.TOKEN);

// Create a start command for our Telegram bot
bot.start((ctx) => {
  ctx.replyWithDice();
  ctx.reply(
    `Welcome, ${ctx.message.from.first_name}! 👋\nWelcome to the Anker World Bot.\nPlease use the buttons below to navigate. 🚀`
  );

  const mainMenu = Markup.inlineKeyboard([
    [Markup.button.callback("📊 Wallet Balance", "getbalance")],
    [Markup.button.callback("💰 Buy", "buy")],
    [Markup.button.callback("💸 Sell", "sell")],
    [Markup.button.callback("❌ Cancel Order", "closeorder")],
  ]);

  ctx.reply("What would you like to do?", mainMenu);
});

bot.command("getpnl", async (ctx) => {
  ctx.reply("Getting Positions");
  try {
    getPnl.start();
  } catch (error) {
    console.log(error);
    let message = "Couldnt get Positions";
    sendMessage(message);
  }
});

bot.action("getbalance", async (ctx) => {
  try {
    const balance = await getWalletBalance({
      coin: "USDT",
      accountType: "CONTRACT",
    });
    // ctx.reply(`Your current wallet balance is: ${balance}`);
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    ctx.reply(
      "Sorry, I couldn't retrieve your wallet balance at the moment. Please try again later."
    );
  }
});

bot.action("buy", async (ctx) => {
  try {
    console.log("Buy called");
    await Buy();
    // ctx.reply("Buy order placed successfully!");
  } catch (error) {
    console.error("Error placing buy order:", error);
    ctx.reply(
      "Sorry, I couldn't place the buy order at the moment. Please try again later."
    );
  }
});

bot.action("sell", async (ctx) => {
  try {
    await sell();
    ctx.reply("Sell order placed successfully!");
  } catch (error) {
    console.error("Error placing sell order:", error);
    ctx.reply(
      "Sorry, I couldn't place the sell order at the moment. Please try again later."
    );
  }
});

export { bot };
