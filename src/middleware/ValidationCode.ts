import i18next from 'i18next';
import { TicketPayload, TicketTypes } from '../domain/entities';
import { mod10 } from '../utils';

export class ValidationCode {
  validate(payload: TicketPayload): void | never {
    //@ts-ignore
    if (isNaN(payload.lineCode) || payload.lineCode.includes('.')) {
      throw new Error(i18next.t('error.string_not_allowed'));
    }

    if (/^[0-9]{47}$/.test(payload.lineCode)) {
      this.validateBankTicket(payload);
    } else if (/^[0-9]{48}$/.test(payload.lineCode)) {
      this.validateAgreementTicket(payload);
    } else {
      throw new Error(i18next.t('error.line_invalid_format'));
    }
  }

  private validateBankTicket(payload: TicketPayload): void | never {
    mod10(payload.lineCode, TicketTypes.bank);
  }
  private validateAgreementTicket(payload: TicketPayload): void | never {
    mod10(payload.lineCode, TicketTypes.agreement);
  }
}
