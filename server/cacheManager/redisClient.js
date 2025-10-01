import Redis from "ioredis";

// Connect to Upstash Redis 
const redis = new Redis(process.env.REDIS_URL, {
  tls: {}, 
});

redis.on("connect", () => console.log("✅ Connected to Redis (Upstash)"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;
