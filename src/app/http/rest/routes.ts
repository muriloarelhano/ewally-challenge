import { Router } from 'express';
import { TicketController } from 'src/controllers/TicketController';
import { ExpressAdapter } from '../../../adapters/ExpressAdapter';

const router = Router();

export default ({ repository, cache }: any) => {
  const ticketController = new TicketController(repository, cache);

  router.get(
    '',
    ExpressAdapter.perform(
      ticketController.getTicketByCode.bind(ticketController),
    ),
  );

  return router;
};
