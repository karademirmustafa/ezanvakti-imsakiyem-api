import { redisClient } from "../config/redis.config";

export async function getFromCache(key: string): Promise<string | null> {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (error) {
    console.error("Redis getFromCache error:", error);
    return null;
  }
}

export async function setToCache(
  key: string,
  value: string,
  ttlInSeconds: number = 3600
): Promise<void> {
  try {
    await redisClient.setEx(key, ttlInSeconds, value);
  } catch (error) {
    console.error("Redis setToCache error:", error);
  }
}

export async function deleteFromCache(key: string): Promise<void> {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Redis deleteFromCache error:", error);
  }
}
