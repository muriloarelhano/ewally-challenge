import Redis from 'redis';
import { AppContext } from '../interfaces';
import { logger } from './logger';

export const context: AppContext = {
  repository: {},
  logger,
  cache: Redis,
};
