import { TicketRepository } from '../../app/repositories';

export default abstract class BaseService {
  constructor(protected readonly repository: TicketRepository) {}
}
