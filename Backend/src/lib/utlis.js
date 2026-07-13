import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  console.log("NODE_ENV =", ENV.NODE_ENV);
  console.log("CLIENT_URL =", ENV.CLIENT_URL);

  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log({
    secure: ENV.NODE_ENV !== "development",
    sameSite: ENV.NODE_ENV === "development" ? "lax" : "none",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: ENV.NODE_ENV !== "development",
    sameSite: ENV.NODE_ENV === "development" ? "lax" : "none",
  });

  return token;
};
