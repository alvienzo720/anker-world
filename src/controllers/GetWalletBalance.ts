import { BotConfigs } from "../config";
import { RestClientV5 } from "bybit-api";
import { Request, Response } from "express";

const client = new RestClientV5({
  testnet: true,
  key: BotConfigs.API_KEY,
  secret: BotConfigs.API_SECRET,
});

async function getWalletBalance(req: Request, res: Response) {
  if (req.body) {
    let { coin, accountType } = req.body;
    const result = await client.getWalletBalance({ coin, accountType });
    res.status(200).json({
      result: result,
    });
  } else {
    console.error("No request");
    return res.status(502).json({
      error: "No request Body",
    });
  }
}

export { getWalletBalance };
