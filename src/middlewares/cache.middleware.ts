import { Request, Response, NextFunction } from "express";
import { getFromCache, setToCache } from "../utils/redis.util";

export const cacheMiddleware = (
  keyPrefix: string,
  ttlInSeconds: number = 3600
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `${keyPrefix}:${req.originalUrl}`;

      const cachedData = await getFromCache(key);
      if (cachedData) {
        return res.success(JSON.parse(cachedData));
      }

      res.locals.cacheKey = key;
      res.locals.ttlInSeconds = ttlInSeconds;
      next();
    } catch (error) {
      console.error("Cache middleware error:", error);
      next();
    }
  };
};

const pendingCacheRequests = new Map<string, Promise<any>>();

export const globalCacheMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") {
      const key = req.originalUrl;

      if (pendingCacheRequests.has(key)) {
        return pendingCacheRequests
          .get(key)
          ?.then(() => next())
          .catch(next);
      }

      const cachePromise = getFromCache(key)
        .then((cachedData) => {
          if (cachedData) {
            res.json(JSON.parse(JSON.parse(cachedData)));
            return true;
          }
          return false;
        })
        .catch((error) => {
          console.error("Error while fetching data from cache:", error);
          return false;
        });

      pendingCacheRequests.set(key, cachePromise);

      cachePromise
        .then((isCacheHit) => {
          if (isCacheHit) {
            pendingCacheRequests.delete(key);
            return;
          }

          const originalSend = res.send.bind(res);
          res.send = (body: any): Response<any, Record<string, any>> => {
            try {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                let ttlInSeconds = 0;

                if (req.originalUrl.startsWith("/api/locations")) {
                  ttlInSeconds = Number(process.env.LONG_CACHE_TIME || 86400);
                } else if (req.originalUrl.startsWith("/api/prayer-times")) {
                  ttlInSeconds = Number(process.env.SHORT_CACHE_TIME || 3600);
                }

                if (ttlInSeconds > 0 && body) {
                  setToCache(key, JSON.stringify(body), ttlInSeconds).catch(
                    (error) => {
                      console.error("Failed to save data to cache:", error);
                    }
                  );
                }
              }
            } catch (error) {
              console.error("Error while saving data to cache:", error);
            } finally {
              pendingCacheRequests.delete(key);
            }

            return originalSend(body);
          };

          next();
        })
        .catch((error) => {
          console.error("Error in global cache middleware:", error);
          pendingCacheRequests.delete(key);
          next(error);
        });
    } else {
      next();
    }
  };
};
