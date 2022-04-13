import { TicketRepository } from '../../src/app/repositories';
import { TicketController } from '../../src/controllers';
import context from '../app/context';

describe('Testing Ticket Controller...', () => {
  const ticketController = new TicketController(
    context.repository.default as TicketRepository,
    context.logger,
    context.cache,
  );
  const exampleLineCode = '21290001192110001210904475617405975870000002000';
  it('Should return correct values when consult line code', () => {
    const response = ticketController.getTicketByCode({
      lineCode: exampleLineCode,
    });
    expect(response).toHaveProperty('barCode');
    expect(response.barCode).toBe(
      '21299758700000020000001121100012100447561740',
    );
    expect(response).toHaveProperty('amount');
    expect(response.amount).toBe('20.00');

    expect(response).toHaveProperty('expirationDate');
  });
});
