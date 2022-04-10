import i18next from 'i18next';
import { TicketPayload } from '../domain/entities';

export class ValidationBarCode {
  static validate(payload: TicketPayload): void {
    //@ts-ignore
    if (isNaN(payload.code)) throw new Error(i18next.t('number_not_allowed'));
  }
}
