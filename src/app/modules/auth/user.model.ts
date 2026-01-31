import { model, Schema } from "mongoose";
import { UserRole, type UserI } from "./user.interface.js";

const userSchema = new Schema<UserI>({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    role:{
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    }
}, {
    timestamps: true,
});

export const User = model<UserI>("User", userSchema);