import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import bodyParser from 'body-parser';
import compression from 'compression';
import { AppContext } from '../../../interfaces';
import express, { Request, Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';

export default (context: AppContext) => {
  const server = express();

  server.use(bodyParser.json());
  server.use(compression());

  /* istanbul ignore next */
  if (isProd) {
    server.use(cors());
    server.use(helmet());
  }

  /*This function is used to kubernetes liveness probe */
  server.get('/rest/ping', (_req: Request, res: Response) => {
    res.status(200).send('pong');
  });

  /* istanbul ignore next */
  server.use('/rest', router(context));

  return server;
};
