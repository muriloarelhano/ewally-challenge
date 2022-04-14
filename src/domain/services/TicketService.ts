import {
  getBankBarCodeFromLineCode,
  getAmount,
  getExpirationDate,
  getAgBarCodeFromLineCode,
  identifyTicketCodeType,
} from '../../utils';
import BaseService from './BaseService';

export class TicketService extends BaseService {
  getTicketByCode(lineCode: string) {
    return {
      lineCode,
      barCode:
        lineCode.length == 48
          ? getAgBarCodeFromLineCode(lineCode)
          : getBankBarCodeFromLineCode(lineCode),
      amount: getAmount(lineCode, identifyTicketCodeType(lineCode)),
      expirationDate: getExpirationDate(lineCode),
    };
  }
}
