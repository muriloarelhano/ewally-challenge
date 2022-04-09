import Redis from 'redis';
import { AppContext } from '../interfaces';
import { TicketRepository } from './repositories/TicketRepository';

export const context: AppContext = {
  repository: {
    ticket: new TicketRepository(),
  },
  cache: Redis,
};
