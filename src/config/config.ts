import "dotenv/config";

export const BotConfigs = {
  API_KEY: (process.env.API_KEY as string) || "",
  API_SECRET: (process.env.API_SECRET as string) || "",
  TEST_NET: true,
  MAIN_URL: (process.env.MAIN_URL as string) || "",
};
