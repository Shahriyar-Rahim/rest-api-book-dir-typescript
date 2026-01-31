import mongoose from "mongoose";
import type { BookType } from "./book.interface.js";


// create schema for book()
const bookSchema = new mongoose.Schema<BookType>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    publicationYear: {
        type: Number,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isAvailable: Boolean, },
    {
        timestamps: true
    }
);

// create model
export const Book = mongoose.model<BookType>("book", bookSchema);