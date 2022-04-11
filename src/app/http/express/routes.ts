import { Router } from 'express';
import { TicketController } from '../../../controllers/TicketController';
import { AppContext } from '../../../interfaces';
import { ExpressAdapter } from '../../../adapters/ExpressAdapter';
import { ValidationBarCode } from '../../../middleware/ValidationBarCode';

const router = Router();

export default ({ repository, cache, logger }: AppContext) => {
  const ticketController = new TicketController(
    repository.ticket,
    cache,
    logger,
  );
  const validationMiddleware = new ValidationBarCode();

  router.get(
    '/:code',
    ExpressAdapter.performMiddleware(
      validationMiddleware.validate.bind(validationMiddleware),
    ),
    ExpressAdapter.perform(
      ticketController.getTicketByCode.bind(ticketController),
    ),
  );

  return router;
};
