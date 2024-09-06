import { Application } from "express";
import { BotRoutes } from "./api";

export const ConfigureRoutes = (app: Application) => {
  app.get("/health-check", (req, res) => {
    res.status(200).json("Welcome to Anker World");
  });
  app.use([BotRoutes]);
};
