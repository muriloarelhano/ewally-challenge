import { Router } from 'express';
import { TicketController } from '../../../controllers/TicketController';
import { AppContext } from '../../../interfaces';
import { ExpressAdapter } from '../../../adapters/ExpressAdapter';

const router = Router();

export default ({ repository, cache }: AppContext) => {
  const ticketController = new TicketController(repository.ticket, cache);

  router.get(
    '/:code',
    ExpressAdapter.perform(
      ticketController.getTicketByCode.bind(ticketController),
    ),
  );

  return router;
};
