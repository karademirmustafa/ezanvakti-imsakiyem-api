import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger.config";
import { connectMongoDB } from "./config/mongo.config";
import { corsOptions } from "./config/cors.config";
import { container } from "./config/inversify.config";

import { errorHandler } from "./middlewares/error.middleware";
import { extendResponse } from "./middlewares/response-extender.middleware";
import { rateLimiter } from "./middlewares/rate-limit.middleware";
import { globalCacheMiddleware } from "./middlewares/cache.middleware";
import { requestIdMiddleware } from "./middlewares/request-id.middleware";
import { requestLoggingMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";

import { sanitizeInput } from "./utils/sanitize.util";
import { LogWorker } from "./workers/log.worker";

// renderMarkdown yardımcı fonksiyonunu import etme
import { renderMarkdown } from "./utils/markdown.util";
import path from "path";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.set("trust proxy", 1);
  app.use(requestLoggingMiddleware);

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(requestIdMiddleware);

  app.use(extendResponse());
  app.use(sanitizeInput);
  app.use(rateLimiter);

  app.get("/api-docs/json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(swaggerSpec);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  app.use(globalCacheMiddleware());

  app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../README.md");
    const htmlContent = renderMarkdown(filePath, "tr");
    res.send(htmlContent);
  });

  app.get("/README.md", (req, res) => {
    const filePath = path.join(__dirname, "../README.md");
    const htmlContent = renderMarkdown(filePath, "tr");
    res.send(htmlContent);
  });

  app.get("/README.en.md", (req, res) => {
    const filePath = path.join(__dirname, "../README.en.md");
    const htmlContent = renderMarkdown(filePath, "en");
    res.send(htmlContent);
  });
});

connectMongoDB();

const logWorker = container.get(LogWorker);
logWorker.startCronJob();

server.setErrorConfig((app) => {
  app.use("*", notFoundMiddleware);
  app.use(errorHandler);
});

const app = server.build();

export { app };
