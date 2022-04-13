import { TicketTypes } from "../domain/entities";
import { getCodeBlocks } from "./code";

export const mod10 = (
  code: string,
  codeType: TicketTypes,
  callback: (dv: string, block: string) => void | never,
): void => {
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
    callback(dv, block);
  });
};

export const mod11 = (
  barCode: string,
  callback: (dv: string) => void | never,
) => {
  const numbers: string[] = barCode.split('');
  let sum = 0;
  let multiplier = 2;
  numbers.reverse().forEach((number) => {
    if (multiplier > 9) multiplier = 2;
    sum += Number(number) * multiplier;
    multiplier++;
  });
  let result = 11 - (sum % 11);
  if (result == 0 || result == 10 || result == 11) result = 1;
  callback(String(result));
};

export const mod11Ag = (
  barCode: string,
  callback: (dv: string) => void | never,
) => {
  const numbers: string[] = barCode.split('');
  let sum = 0;
  let multiplier = 2;
  numbers.splice(3, 1);
  numbers.reverse().forEach((number) => {
    if (multiplier > 9) multiplier = 2;
    sum += Number(number) * multiplier;
    multiplier++;
  });
  let result = 11 - (sum % 11);
  if (result == 0 || result == 1) result = 0;
  if (result == 10) result = 1;
  callback(String(result));
};
