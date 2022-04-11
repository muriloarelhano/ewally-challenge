import { TicketPayload } from '../domain/entities';
import { TicketService } from '../domain/services';
import BaseController from './BaseController';

export class TicketController extends BaseController {
  private readonly ticketService = new TicketService(this.repository);
  getTicketByCode(payload: TicketPayload) {
    return this.ticketService.getTicketByCode(payload.lineCode);
  }
}
