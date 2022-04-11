import RedisMock from 'redis-mock';
import { FakeRepository } from '../repositories/FakeRepository';

export default {
  repository: {
    default: new FakeRepository(),
  },
  cache: RedisMock,
};
