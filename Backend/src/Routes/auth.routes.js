import express from "express";
import {
  signup,
  login,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjectProtection } from "../middleware/arcject.middleware.js";

const router = express.Router();

// Public routes (no JWT required)
router.post("/signup", arcjectProtection, signup);
router.post("/login", arcjectProtection, login);
router.post("/logout", logout);

// Protected routes (JWT required)
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
