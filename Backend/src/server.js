// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import messagesRoutes from "./Routes/messages.routes.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//make ready for deployement

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => console.log("Server running on port 3000"));
