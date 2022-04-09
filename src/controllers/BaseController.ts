import { Logger } from 'winston';
import { TicketRepository } from '../app/repositories/TicketRepository';

export default abstract class BaseController {
  constructor(
    protected readonly repository: TicketRepository,
    protected readonly logger: Logger,
    protected readonly cache: any,
  ) {}
}
