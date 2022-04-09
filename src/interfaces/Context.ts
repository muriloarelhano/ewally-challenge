import { TicketRepository } from '../app/repositories/TicketRepository';
import { Logger } from 'winston';

export interface AppContext {
  repository: {
    ticket: TicketRepository;
  };
  logger: Logger;
  cache: any;
}
