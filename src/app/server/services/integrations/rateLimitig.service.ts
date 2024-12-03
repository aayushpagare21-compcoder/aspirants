import { Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

class RatelimitService {
  private static instance: RatelimitService;
  private ratelimitInstance: Ratelimit;

  // Private constructor to prevent direct instantiation
  private constructor() {
    const redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    });

    this.ratelimitInstance = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.fixedWindow(
        parseInt(process.env.DEFAULT_API_TOKENS!),
        process.env.DEFAULT_API_TOKEN_FILLED_AFTER! as Duration,
      ),
    });
  }

  // Static method to get the singleton instance
  public static getInstance(): RatelimitService {
    if (!RatelimitService.instance) {
      RatelimitService.instance = new RatelimitService();
    }
    return RatelimitService.instance;
  }

  // Expose the Ratelimit instance
  public getRatelimit(): Ratelimit {
    return this.ratelimitInstance;
  }
}

export default RatelimitService;
