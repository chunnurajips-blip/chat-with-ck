// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import messagesRoutes from "./Routes/messages.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
