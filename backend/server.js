import express from "express";
import productRouter from "./routes/product.route.js";

// @ts-check

const PORT = 3000;
const init = () => {
  const app = express();
  app.use(express.json());

  app.use("/", productRouter);

  app.listen(PORT, () => {
    console.log("Server Running on : ", PORT);
  });
};

init();
