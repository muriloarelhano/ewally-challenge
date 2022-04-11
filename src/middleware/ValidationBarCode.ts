import i18next from 'i18next';
import { CodeTypes, TicketPayload } from '../domain/entities';
import {
  convertBarCodeFromLineCode,
  getAmount,
  getCodeBlocks,
  getExpirationDate,
} from '../utils';

export class ValidationBarCode {
  validate(payload: TicketPayload): void | never {
    //@ts-ignore
    if (isNaN(payload.code) || payload.code.includes('.'))
      throw new Error(i18next.t('error.string_not_allowed'));

    if (!/^[0-9]{47}$/.test(payload.code))
      throw new Error(i18next.t('error.line_invalid_format'));

    this.validateTicket(payload);
    console.log({
      barCode: convertBarCodeFromLineCode(payload.code),
      expirationDate: getExpirationDate(payload.code),
      amount: getAmount(payload.code),
    });
  }

  validateTicket(payload: TicketPayload): void | never {
    const blocks = getCodeBlocks(payload.code, CodeTypes.line);

    blocks.forEach((block, blockIndex) => {
      let sum: number = 0;
      const numbers = block.split('');

      numbers.forEach((number, index) => {
        const multiplier = (index + blockIndex) % 2 == 0 ? 2 : 1;
        const multipliedNumber = (Number(number) * multiplier).toString();

        if (numbers.length - 1 != index) {
          if (Number(multipliedNumber) > 9) {
            sum += Number(multipliedNumber[0]) + Number(multipliedNumber[1]);
          } else {
            sum += Number(multipliedNumber);
          }
        }
      });
      const dv = (Math.ceil(sum / 10) * 10 - (sum % 10)).toString()[1];
      if (dv != block[block.length - 1])
        throw new Error(i18next.t('error.check_digit'));
    });
  }

  private validateAgreement() {}
}
