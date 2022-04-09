import Redis from 'redis';
import { AppContext } from '../interfaces';
import { logger } from './logger';
import { TicketRepository } from './repositories/TicketRepository';

export const context: AppContext = {
  repository: {
    ticket: new TicketRepository(),
  },
  logger,
  cache: Redis,
};
