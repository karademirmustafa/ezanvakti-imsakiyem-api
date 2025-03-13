import express from "express";
import sanitize from "mongo-sanitize";

export const sanitizeInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  req.body = sanitize(req.body);
  req.query = sanitize({ ...req.query });
  req.params = sanitize({ ...req.params });

  next();
};
