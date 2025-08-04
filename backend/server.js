import express from "express";
import productRouter from "./routes/product.route.js";
import cors from "cors";
// @ts-check

const PORT = 3000;
const init = () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );

  app.use("/", productRouter);

  app.listen(PORT, () => {
    console.log("Server Running on : ", PORT);
  });
};

init();
