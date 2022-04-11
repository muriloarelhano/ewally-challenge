import { DateTime } from 'luxon';
import { CodeTypes, TicketPayload, TicketTypes } from '../domain/entities';

export const getCodeBlocks = (
  lineCode: TicketPayload['lineCode'],
  codeType: CodeTypes,
): string[] => {
  let blocks: string[] = [];
  switch (codeType) {
    case CodeTypes.line:
      blocks.push(lineCode.substring(0, 10));
      blocks.push(lineCode.substring(10, 21));
      blocks.push(lineCode.substring(22, 32));
      break;
    case CodeTypes.bar:
      blocks.push(lineCode.substring(0, 3));
      blocks.push(lineCode.substring(3, 4));
      blocks.push(lineCode.substring(lineCode.length - 14, lineCode.length));
      blocks.push(lineCode.substring(4, 9));
      blocks.push(lineCode.substring(10, 16));
      blocks.push(lineCode.substring(16, 20));
      blocks.push(lineCode.substring(21, 23));
      blocks.push(lineCode.substring(23, 30));
      blocks.push(lineCode.substring(30, 31));
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
  code.splice(4, 0, generateBarCodeCheckDigit(barCode));
  return code.join('');
};

export const generateBarCodeCheckDigit = (barCode: string): string => {
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
