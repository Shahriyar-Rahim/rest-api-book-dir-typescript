import { Router } from "express";
import { loginUser, registerUser } from "./user.controller.js";

const router = Router();

// Define user-related routes here
router.get("/", registerUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export const UserRoutes = router;