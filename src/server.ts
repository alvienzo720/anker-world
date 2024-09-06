import express from "express";

const app = express();

const start = async () => {
  console.log(`---`.repeat(10));
  console.log(`starting bot server  🤖 `);
  console.log(`---`.repeat(10));
};

start();
app.listen(5000, () => {
  console.log("Server is listening on port 5000! We are good to go 👍 ");
});
