import { Markup, Telegraf } from "telegraf";
import { BotConfigs } from "../config";

const bot = new Telegraf(BotConfigs.TOKEN);

//creat a start command for our telgram bot and pass a message
bot.start((ctx) => {
  ctx.replyWithDice();
  ctx.reply(
    `Welcome ${ctx.message.from.first_name} lets Buy and Sell USDT\n Use these buttons below. 😊 `
  );

  const custom_keyboard = Markup.inlineKeyboard([
    [Markup.button.callback("Wallet Balance 💲", "getbalance")],
    [Markup.button.callback("Cancel Order ❌", "closeorder")],
  ]);
  ctx.reply("Please select any option:", {
    reply_markup: {
      inline_keyboard: custom_keyboard.reply_markup.inline_keyboard,
    },
  });
});


export {bot}
