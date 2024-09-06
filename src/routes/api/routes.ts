import { Router } from "express";
import { getWalletBalance } from "../../controllers";

const router = Router();
router.get("/get-wallet-balance", getWalletBalance);

export { router as BotRoutes };
