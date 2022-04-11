import i18next from 'i18next';
import { DateTime } from 'luxon';
import { TicketPayload, TicketTypes } from '../domain/entities';

export const getCodeBlocks = (
  lineCode: TicketPayload['lineCode'],
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
      blocks.push(lineCode.substring(24, 26));
      blocks.push(lineCode.substring(26));
      break;
  }

  return blocks;
};

export const convertBarCodeFromLineCode = (
  lineCode: TicketPayload['lineCode'],
): string => {
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
  code.splice(4, 0, mod11(barCode));
  return code.join('');
};

export const mod11 = (barCode: string): string => {
  const numbers: string[] = barCode.split('');
  let sum = 0;
  let multiplier = 2;
  numbers.reverse().forEach((number) => {
    sum += Number(number) * multiplier;
    multiplier++;
    if (multiplier > 9) multiplier = 2;
  });
  let result = 11 - (sum % 11);
  if (result == 0) result = 1;
  if (result == 10) result = 1;
  if (result == 11) result = 1;
  return String(result);
};

export const mod10 = (code: string, codeType: TicketTypes): void | never => {
  const blocks = getCodeBlocks(code, codeType);

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
};

export const identifyTicketType = (): TicketTypes => {
  return TicketTypes.bank;
};

export const getExpirationDate = (
  lineCode: TicketPayload['lineCode'],
): string => {
  var expiration: string = lineCode.slice(33, 37);
  var date = new Date('10/07/1997');
  date.setTime(date.getTime() + Number(expiration) * 24 * 60 * 60 * 1000);
  return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
};

export const getAmount = (lineCode: TicketPayload['lineCode']): string => {
  return (
    parseFloat(lineCode.substring(lineCode.length - 10, lineCode.length)) / 100
  ).toFixed(2);
};
