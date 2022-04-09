import BaseService from './BaseService';

export class TicketService extends BaseService {
  getTicketByCode(code: string) {
    return this.repository.select();
  }
  createNewTicket() {}
  updateTicket() {}
  deleteTicket() {}
}
