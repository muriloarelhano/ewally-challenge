import { AppContext } from '../interfaces';
import { logger } from './logger';
import { redisClient } from './cache';

export const context: AppContext = {
  repository: {},
  logger,
  cache: redisClient,
};
