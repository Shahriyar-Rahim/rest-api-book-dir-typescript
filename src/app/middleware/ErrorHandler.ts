import { type NextFunction, type Request, type Response } from "express";

interface ErrorH extends Error {
    statusCode?: number;
    status?: string;
    message: string;
    stack?: string;
    isOperational?: boolean;
}

export const errorHandler = (err: ErrorH, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err.isOperational === false ? undefined : err,
    })
}