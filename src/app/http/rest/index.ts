import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';

const isProd = process.env.NODE_ENV === 'production';

export default (context: any) => {
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
