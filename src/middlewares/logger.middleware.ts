import { Request, Response, NextFunction } from "express";
import { logger, getLogData } from "../utils/logger.util";

const requestLoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    const logData = getLogData(req, res);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      logger.info("Request Logged", logData);
    }
  });

  next();
};

export { requestLoggingMiddleware };