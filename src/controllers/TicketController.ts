import { TicketPayload } from '../domain/entities';
import { TicketService } from '../domain/services';
import BaseController from './BaseController';

export class TicketController extends BaseController {
  private readonly ticketService = new TicketService();
  async getTicketByCode(payload: TicketPayload) {
    // TODO: envolver o log em uma classe e criar um interface, para caso queria trocar de banco seja fácil a modificação (desacoplamento)
    const value = await this.cache.get(payload.lineCode);
    if (value) {
      return JSON.parse(value);
    }

    const result = this.ticketService.getTicketByCode(payload.lineCode);

    this.cache.set(payload.lineCode, JSON.stringify(result));

    return result;
  }
}
