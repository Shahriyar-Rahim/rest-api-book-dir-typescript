import type { BookType } from "./book.interface.js";
import { Book } from "./books.model.js";

export const getBooks = async () => {
    const result = await Book.find();
    return result;
}

export const createNewBook = async (data: BookType) => {
    const result = await Book.create(data);
    if(result === null) {
        throw new Error("Failed to create book");
    }
    return result;
}

export const updateBookById = async (id: string, updateData: BookType) => {
    const result = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if(result === null) {
        throw new Error("Failed to update book");
    }
    return result;
}