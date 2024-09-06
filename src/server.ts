import express from "express";
import { configureMiddleWare } from "./middlewares";
import { ConfigureRoutes } from "./routes";
import { bot } from "./bot";

const app = express();
configureMiddleWare(app);
ConfigureRoutes(app);

const start = async () => {
  console.log(`---`.repeat(10));
  console.log(`starting bot  🤖 `);
  console.log(`---`.repeat(10));
  bot
    .launch()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
start();
app.listen(5000, () => {
  console.log("Server is listening on port 5000! We are good to go 👍 ");
});
