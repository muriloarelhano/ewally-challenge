import { createClient } from 'redis';
import { logger } from './logger';

let redisClient = createClient({
  url: `redis://${process.env.CACHE_HOST}:${process.env.CACHE_PORT}`,
});

(async () => {
  try {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
  } catch (error: any) {
    logger.error(error);
  }
})();

export { redisClient };
