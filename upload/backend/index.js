import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/user-routes.js";
import "dotenv/config";
import cartRouter from "./routes/cart-route.js";
//app config
import orderRouter from "./routes/order-route.js";

const app = express();
const port = 5000;

connectDB();

app.use(bodyParser.json());

app.use(cors()); //using this we can access backend from any frontend

app.use("/api/food", foodRouter);

app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

