import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found.error";

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Not Found - ${req.originalUrl}`));
};

export { notFoundMiddleware };
