import { DateTime } from 'luxon';
import { CodeTypes, TicketPayload, TicketTypes } from '../domain/entities';

export const getCodeBlocks = (
  code: TicketPayload['code'],
  codeType: CodeTypes,
): string[] => {
  let blocks: string[] = [];
  switch (codeType) {
    case CodeTypes.line:
      blocks.push(code.substring(0, 10));
      blocks.push(code.substring(10, 21));
      blocks.push(code.substring(22, 32));
      break;
    case CodeTypes.bar:
      blocks.push(code.substring(0, 12));
      blocks.push(code.substring(12, 12));
      blocks.push(code.substring(24, 12));
      blocks.push(code.substring(36, 12));
      break;
  }

  return blocks;
};

export const convertBarCodeFromLineCode = (
  lineCode: TicketPayload['code'],
): string => {
  return (
    lineCode.substring(0, 3) +
    lineCode.substring(3, 4) +
    lineCode.substring(lineCode.length - 14, lineCode.length) +
    lineCode.substring(4, 9) +
    lineCode.substring(10, 16) +
    lineCode.substring(16, 20) +
    lineCode.substring(21, 23) +
    lineCode.substring(23, 30) +
    lineCode.substring(30, 31)
  );
};

export const identifyTicketType = (): TicketTypes => {
  return TicketTypes.bank;
};

export const getExpirationDate = (code: TicketPayload['code']): string => {
  var expiration: string = code.slice(33, 37);
  var date = new Date('10/07/1997');
  date.setTime(date.getTime() + Number(expiration) * 24 * 60 * 60 * 1000);
  return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
};

export const getAmount = (code: TicketPayload['code']): string => {
  return (
    parseFloat(code.substring(code.length - 10, code.length)) / 100
  ).toFixed(2);
};
