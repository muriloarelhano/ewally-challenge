import RedisMock from 'redis-mock';
import { logger } from '../../src/app/logger';

export default {
  repository: {},
  cache: RedisMock,
  logger,
};
