import { TicketPayload } from '../../src/domain/entities';
import { TicketService } from '../../src/domain/services';
import BaseController from './BaseController';

export class TicketController extends BaseController {
  private readonly ticketService = new TicketService(this.repository);
  getTicketByCode(payload: TicketPayload) {
    console.log(payload)
    return this.ticketService.getTicketByCode(payload.code);
  }
}
