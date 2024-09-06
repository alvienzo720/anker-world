import { Markup, Telegraf } from "telegraf";
import { BotConfigs } from "../config";
import { getWalletBalance } from "../controllers";

const bot = new Telegraf(BotConfigs.TOKEN);

// Create a start command for our Telegram bot
bot.start((ctx) => {
  ctx.replyWithDice();
  ctx.reply(
    `Welcome, ${ctx.message.from.first_name}! 👋\nWelcome to the Anker World Bot.\nPlease use the buttons below to navigate. 🚀`
  );

  const mainMenu = Markup.inlineKeyboard([
    [Markup.button.callback("📊 Wallet Balance", "getbalance")],
    [Markup.button.callback("❌ Cancel Order", "closeorder")],
  ]);

  ctx.reply("What would you like to do?", mainMenu);
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

export { bot };
