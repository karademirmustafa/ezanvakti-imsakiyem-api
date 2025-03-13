// logger.util.ts
import * as winston from "winston";
import "winston-daily-rotate-file";
import { Request, Response } from "express";

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/requests-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "info",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/errors-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
    })
  );
}

const getLogData = (req: Request, res: Response) => {
  const responseTime = req.startTime ? Date.now() - req.startTime : undefined;
  return {
    timestamp: new Date().toISOString(),
    correlationId: req.correlationId,
    requestId: req.id,
    method: req.method,
    url: req.originalUrl,
    query: req.query || {},
    params: req.params,
    responseCode: res.statusCode,
    responseTime,
    userAgent: req.headers["user-agent"] || "Unknown",
    ipAddress: req.ip || "Unknown",
    referrer: req.get("Referrer") || req.get("Referer") || "Direct",
    contentLength: res.get("Content-Length"),
  };
};

export { logger, getLogData };
