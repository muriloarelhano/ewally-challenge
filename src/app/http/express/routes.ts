import { Router } from 'express';
import { TicketController } from '../../../controllers/TicketController';
import { AppContext } from '../../../interfaces';
import { ExpressAdapter } from '../../../adapters/ExpressAdapter';
import { ValidationCode } from '../../../middleware/ValidationCode';

const router = Router();

export default ({ repository, cache, logger }: AppContext) => {
  const ticketController = new TicketController(
    repository.ticket,
    cache,
    logger,
  );
  const validationMiddleware = new ValidationCode();

  router.get(
    '/:lineCode',
    ExpressAdapter.performMiddleware(
      validationMiddleware.validate.bind(validationMiddleware),
    ),
    ExpressAdapter.perform(
      ticketController.getTicketByCode.bind(ticketController),
    ),
  );

  return router;
};
