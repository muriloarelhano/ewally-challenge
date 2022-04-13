import i18next from 'i18next';
import { TicketPayload, TicketTypes } from '../domain/entities';
import { getAgBarCodeFromLineCode, mod10, mod11Ag } from '../utils';

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
    mod10(payload.lineCode, TicketTypes.bank, (dv, block) => {
      if (dv != block[block.length - 1])
        throw new Error(i18next.t('error.check_digit'));
    });
  }

  private validateAgreementTicket(payload: TicketPayload): void | never {
    if (payload.lineCode[0] !== '8')
      throw new Error(i18next.t('error.invalid_agreement_first_number'));

    const barCode = getAgBarCodeFromLineCode(payload.lineCode);

    if (payload.lineCode[2] === '6' || payload.lineCode[2] === '7') {
      mod10(barCode, TicketTypes.agreement, (dv, block) => {
        if (dv != block[block.length - 1])
          throw new Error(i18next.t('error.check_digit'));
      });
    } else if (payload.lineCode[2] === '8' || payload.lineCode[2] === '9') {
      mod11Ag(barCode, (dv: string) => {
        if (!(dv === barCode[3]))
          throw new Error(i18next.t('error.check_digit'));
      });
    }
  }
}
