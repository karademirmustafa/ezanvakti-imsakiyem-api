import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware = (req: any, res: any, next: any) => {
  req.id = req.headers["x-request-id"] || uuidv4();

  req.correlationId = req.headers["x-correlation-id"] || req.id;
  req.startTime = Date.now();

  res.setHeader("x-request-id", req.id);
  res.setHeader("x-correlation-id", req.correlationId);

  const originalSend = res.send;
  const originalJson = res.json;

  res.send = function (body: any): any {
    if (typeof body === "object") {
      body = {
        ...body,
        requestId: req.id,
        timestamp: Date.now(),
      };
    }
    return originalSend.call(this, body);
  };

  res.json = function (body: any): any {
    body = {
      ...body,
      requestId: req.id,
      timestamp: Date.now(),
    };
    return originalJson.call(this, body);
  };

  next();
};
