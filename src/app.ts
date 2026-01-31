import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes path
import { BooksRoutes } from "./app/modules/books/books.routes.js";
import { UserRoutes } from "./app/modules/auth/user.routes.js";
import { errorHandler } from "./app/middleware/ErrorHandler.js";

// routes
app.use("/api/v1/books", BooksRoutes)
app.use("/api/v1/users", UserRoutes)

// error handler middleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Book Directory server is running",
    });
})

export default app;