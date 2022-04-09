import { TicketRepository } from 'src/app/repositories/TicketRepository';

export interface AppContext {
  repository: {
    ticket: TicketRepository;
  };
  cache: any;
}
