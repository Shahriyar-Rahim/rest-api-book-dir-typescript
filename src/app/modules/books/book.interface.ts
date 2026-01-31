import type { Document } from "mongoose";

export interface BookType extends Document {
    title: string;
    author: string;
    description: string;
    genre: string;
    publicationYear: number;
    isbn: string;
    price: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}