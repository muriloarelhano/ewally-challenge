import { TicketService } from '../../../src/domain/services';
import context from '../../app/context';

describe('Testing Ticket Service...', () => {
  const ticketService = new TicketService();
  const exampleLineCode = '21290001192110001210904475617405975870000002000';
  it('Should return correct values when consult bank line code', () => {
    const response = ticketService.getTicketByCode(exampleLineCode);
    expect(response).toHaveProperty('barCode');
    expect(response.barCode).toBe(
      '21299758700000020000001121100012100447561740',
    );
    expect(response).toHaveProperty('amount');
    expect(response.amount).toBe('20.00');

    expect(response).toHaveProperty('expirationDate');
  });
});
