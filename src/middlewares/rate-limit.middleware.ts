import rateLimit from "express-rate-limit";
import { MESSAGES } from "../constants/messages.constants";

export const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX),
  message: MESSAGES.ERROR.RATE_LIMIT_EXCEEDED,
  standardHeaders: true, 
  legacyHeaders: false
});
