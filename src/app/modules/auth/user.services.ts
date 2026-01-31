import { User } from "./user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";

export const registerNewUser = async (username: string, email: string, password: string) => {
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (existingUser) {
        throw new Error("User with given email or username already exists");
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    await newUser.save();
    return newUser;
}

export const loggedInUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password - user not found");
    }

    // varify pasw
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    
    const token = jwt.sign({
        userId: user._id,
        role: user.role
    }, config.jwt_secret as string, { expiresIn: '1h' });

    return {
        user,
        token
    }
};