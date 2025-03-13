import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    id: string;
    correlationId: string; 
    startTime: number;
  }
}