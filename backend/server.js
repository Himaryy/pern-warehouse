import express from "express";
import productRouter from "./routes/product.route.js";
import cors from "cors";
// @ts-check

const allowedOrigins = [
  "http://localhost:5173",
  "https://stockmaster-psi.vercel.app",
];

const PORT = 3000;
const init = () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
  app.use("/", productRouter);

  app.listen(PORT, () => {
    console.log("Server Running on : ", PORT);
  });
};

init();
