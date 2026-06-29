import express from "express";
<<<<<<< HEAD
import { signup, login, logout } from "../controllers/auth.controllers.js";
=======
import { signup, login, logout } from "../controllers/auth.controller.js";
>>>>>>> 29814d8 (update project)
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
