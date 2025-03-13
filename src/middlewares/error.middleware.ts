import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constants/messages.constants";
import { ValidationError, NotFoundError } from "../errors";
import { logger, getLogData } from "../utils/logger.util";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || MESSAGES.ERROR.INTERNAL_SERVER_ERROR;
  const stackTrace =
    process.env.NODE_ENV === "development"
      ? err.stack || MESSAGES.ERROR.NOT_DETAIL
      : MESSAGES.ERROR.NOT_DETAIL;

  const logData = getLogData(req, res);
  logger.error("Error Handled", {
    ...logData,
    error: {
      name: err.name,
      stack: err.stack,
      message,
    },
  });

  if (err instanceof ValidationError) {
    return res.validationError(err.errors, err.message);
  }

  if (err instanceof NotFoundError) {
    return res.notFound(err.message);
  }

  res.error(message, statusCode, stackTrace);
}
