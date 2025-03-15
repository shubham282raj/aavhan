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

app.get("/api", async (req, res) => {
  res.status(200).send("Hello There API");
});

app.get("/", async (req, res) => {
  res.status(200).send("Hello There");
});

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
