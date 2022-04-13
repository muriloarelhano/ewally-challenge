import {
  getBankBarCodeFromLineCode,
  getAmount,
  getExpirationDate,
} from '../../utils';
import BaseService from './BaseService';

export class TicketService extends BaseService {
  getTicketByCode(lineCode: string) {
    return {
      lineCode,
      barCode: getBankBarCodeFromLineCode(lineCode),
      amount: getAmount(lineCode),
      expirationDate: getExpirationDate(lineCode),
    };
  }
  createNewTicket() {}
  updateTicket() {}
  deleteTicket() {}
}
