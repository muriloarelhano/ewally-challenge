import i18next from 'i18next';
import { DateTime } from 'luxon';
import { TicketPayload, TicketTypes } from '../domain/entities';
import { mod11 } from './module';

export const getCodeBlocks = (
  lineCode: string,
  codeType: TicketTypes,
): string[] => {
  let blocks: string[] = [];
  switch (codeType) {
    case TicketTypes.bank:
      blocks.push(lineCode.substring(0, 10));
      blocks.push(lineCode.substring(10, 21));
      blocks.push(lineCode.substring(22, 32));
      break;
    case TicketTypes.agreement:
      blocks.push(lineCode.substring(0, 12));
      blocks.push(lineCode.substring(12, 24));
      blocks.push(lineCode.substring(24, 36));
      blocks.push(lineCode.substring(36));
      break;
  }

  return blocks;
};

export const getBankBarCodeFromLineCode = (lineCode: string): string => {
  let barCode =
    lineCode.substring(0, 3) +
    lineCode.substring(3, 4) +
    lineCode.substring(lineCode.length - 14, lineCode.length) +
    lineCode.substring(4, 9) +
    lineCode.substring(10, 16) +
    lineCode.substring(16, 20) +
    lineCode.substring(21, 23) +
    lineCode.substring(23, 30) +
    lineCode.substring(30, 31);

  const code = barCode.split('');
  mod11(barCode, (dv) => {
    code.splice(4, 0, dv);
  });
  return code.join('');
};

export const getAgBarCodeFromLineCode = (lineCode: string): string => {
  let barCode = '';
  for (let index = 0; index < 4; index++) {
    const start = 11 * index + index;
    const end = 11 * (index + 1) + index;
    barCode += lineCode.substring(start, end);
  }
  return barCode;
};

export const getExpirationDate = (lineCode: string): string => {
  var expiration: string = lineCode.slice(33, 37);
  var date = new Date('10/07/1997');
  date.setTime(date.getTime() + Number(expiration) * 24 * 60 * 60 * 1000);
  return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
};

export const identifyTicketCodeType = (lineCode: string) => {
  if (/^[0-9]{47}$/.test(lineCode)) {
    return TicketTypes.bank;
  } else if (/^[0-9]{48}$/.test(lineCode)) {
    return TicketTypes.agreement;
  } else {
    throw new Error(i18next.t('error.line_invalid_format'));
  }
};

export const getAmount = (lineCode: string, type: TicketTypes): string => {
  switch (type) {
    case TicketTypes.bank:
      return (
        parseFloat(lineCode.substring(lineCode.length - 10, lineCode.length)) /
        100
      ).toFixed(2);
      break;
    case TicketTypes.agreement:
      return (
        parseFloat(getAgBarCodeFromLineCode(lineCode).substring(4, 15)) / 100
      ).toFixed(2);
      break;
  }
};
