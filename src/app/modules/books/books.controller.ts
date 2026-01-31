import { type NextFunction, type Request, type Response } from "express";
import { createNewBook, getBooks, updateBookById } from "./books.services.js";
import { Book } from "./books.model.js";
import mongoose from "mongoose";

// get all books
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await getBooks();
    if (!books) {
      return res.status(404).json({
        message: "No books found",
      });
    }
    res.status(200).json({
      message: "Books retrieved successfully",
    //   data: books,
    books,
    });
  } catch (error) {
    next(error);
  }
};

// create a book
export const createABook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookData = req.body;
    const book = await createNewBook(bookData);
    if (!book) {
      return res.status(400).json({
        message: "Failed to create book",
      });
    }

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};

// get a single book
export const getASingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
  throw new Error("ID is required and must be a string");
}
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "A book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// update a book
export const updateABook = async (req: Request,
  res: Response,
  next: NextFunction,) => {
    try {
        const { id } = req.params;
        if(!id || typeof id !== 'string') {
            throw new Error("ID is required and must be a string");
        }
        const updateData = req.body;
        if(Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No data provided for update",
            });
        }
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid book ID",
            });
        }

        const updatedBook = updateBookById(id, updateData);
        if(!updatedBook) {
            return res.status(404).json({
                message: "Book not found or failed to update",
            });
        }
        res.status(200).json({
            message: "Book updated successfully",
            updatedBook,
        });

    } catch (error) {
        next(error);
    }
}

// delete a book
export const deleteAbook = async ( req: Request,
  res: Response,
  next: NextFunction,) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }
        res.status(200).json({
            message: "Book deleted successfully",
        });

    } catch (error) {
        next(error);
    }
}