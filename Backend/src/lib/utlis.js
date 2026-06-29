import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = process.env;
<<<<<<< HEAD
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  // create a token fo the user
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // prvent to xss attack
    sameSite: "strict", // csrf attacks
    secure: process.env.NODE_ENV == "development" ? false : true,
=======

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  // Create JWT token
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Store token in cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevent XSS attacks
    sameSite: "strict", // Prevent CSRF attacks
    secure: NODE_ENV === "production", // true only in production
>>>>>>> 29814d8 (update project)
  });

  return token;
};
