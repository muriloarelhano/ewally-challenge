import RedisMock from 'redis-mock';
import { FakeRepository } from '../repositories/FakeRepository';
import { logger } from '../../src/app/logger';

export default {
  repository: {
    default: new FakeRepository(),
  },
  cache: RedisMock,
  logger,
};
