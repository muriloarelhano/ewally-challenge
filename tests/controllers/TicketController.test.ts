import { TicketController } from '../../src/controllers';
import context from '../app/context';

describe('Testing Ticket Controller...', () => {
  const ticketController = new TicketController(context.logger, context.cache);
  const exampleBankLineCode = '21290001192110001210904475617405975870000002000';
  const exampleAgLineCode = '858900004609524601791605607593050865831483000010';
  it('Should return correct values when consult bank line code', () => {
    const response = ticketController.getTicketByCode({
      lineCode: exampleBankLineCode,
    });
    expect(response).toHaveProperty('barCode');
    expect(response.barCode).toBe(
      '21299758700000020000001121100012100447561740',
    );
    expect(response).toHaveProperty('amount');
    expect(response.amount).toBe('20.00');

    expect(response).toHaveProperty('expirationDate');
  });

  it('Should return correct values when consult agreement line code', () => {
    const response = ticketController.getTicketByCode({
      lineCode: exampleAgLineCode,
    });
    expect(response).toHaveProperty('barCode');
    expect(response.barCode).toBe(
      '85890000460524601791606075930508683148300001',
    );
    expect(response).toHaveProperty('amount');
    expect(response.amount).toBe('46052.46');

    expect(response).toHaveProperty('expirationDate');
  });
});
