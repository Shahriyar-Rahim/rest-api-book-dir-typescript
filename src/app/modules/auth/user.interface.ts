import type { Document } from "mongoose";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}
export interface UserI extends Document {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}