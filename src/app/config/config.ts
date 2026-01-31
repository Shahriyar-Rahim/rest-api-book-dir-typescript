import dotenv from 'dotenv';

// middleware
dotenv.config();

export const config = {
    port: process.env.PORT,
    db_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire: process.env.JWT_EXPIRE,
    jwt_cookie_expire: process.env.JWT_COOKIE_EXPIRE,
}