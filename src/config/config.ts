import "dotenv/config";

export const BotConfigs = {
  API_KEY: (process.env.API_KEY as string) || "",
  API_SECRET: (process.env.API_SECRET as string) || "",
  TEST_NET: true,
  MAIN_URL: (process.env.MAIN_URL as string) || "",
  TELEGRAM_DELETE_MESSAGE_INTERVAL: 10,
  WHITELISTED_USERS: [541365365, 1946478135],
  CHAT_ID: (process.env.CHAT_ID as string) || "",
  TOKEN: (process.env.TOKEN as string) || "",
};
