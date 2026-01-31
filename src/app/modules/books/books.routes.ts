import { Router } from "express";
import { createABook, deleteAbook, getAllBooks, getASingleBook, updateABook } from "./books.controller.js";
import { auth, authorizeRoles } from "../../middleware/auth.middlewares.js";

const router = Router();

// publicroutes
router.get("/", getAllBooks);
router.get("/:id", auth, getASingleBook);

// admin only routes
router.post("/", auth, authorizeRoles, createABook);
router.put("/:id", auth, authorizeRoles, updateABook);
router.delete("/:id", auth, authorizeRoles, deleteAbook);

export const BooksRoutes = router