import { TicketRepository } from '../app/repositories/TicketRepository';

export default abstract class BaseController {
  constructor(
    protected readonly repository: TicketRepository,
    protected readonly cache: any,
  ) {}
}
