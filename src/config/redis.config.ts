import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || "6379"}`,
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection error:", err);
    throw err;
  }
})();

export { redisClient };
