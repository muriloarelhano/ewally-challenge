import { Ticket, TicketPayload } from '../../domain/entities';
import { databaseClient } from '../database';

export class TicketRepository {
  private readonly db = databaseClient.getRepository(Ticket);
  select(ticket: TicketPayload) {
    // return this.db.find({ where: { ...ticket } });
  }
  create() {}
  update() {}
  delete() {}
}
