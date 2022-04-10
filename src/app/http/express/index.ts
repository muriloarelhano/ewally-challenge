import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import bodyParser from 'body-parser';
import compression from 'compression';
import { AppContext } from '../../../interfaces';
import express, { NextFunction, Request, Response } from 'express';
import { i18nHandler } from '../../i18n';

const isProd = process.env.NODE_ENV === 'production';

export default (context: AppContext) => {
  const server = express();

  server.use(bodyParser.json());
  server.use(compression());
  server.use(i18nHandler);

  if (isProd) {
    server.use(cors());
    server.use(helmet());
  }

  server.get('/ping', (_req: Request, res: Response) => {
    res.status(200).send('pong');
  });

  server.use('/ticket', router(context));

  server.use(
    '',
    (err: any, req: Request, resp: Response, next: NextFunction) => {
      return resp.json({
        message: err.message,
      });
    },
  );

  return server;
};
