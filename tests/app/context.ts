import RedisMock from 'redis-mock';
import { logger } from '../../src/app/logger';

const redisClientMock = RedisMock.createClient()

export default {
  repository: {},
  logger,
  cache: redisClientMock,
};
