import express, { Express } from "express";
import cors from "cors";

export const configureMiddleWare = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};
