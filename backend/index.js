import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to database successfully"));

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api", router);

app.listen(7000, () => {
  console.log(`Server is running`);
});
