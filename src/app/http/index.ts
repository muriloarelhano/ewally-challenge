import context from '../context';
import rest from './rest';
import { config } from 'dotenv';
config();

const server = (restServer: any) => {
  const restPort = process.env.REST_PORT || 3000;

  return () => {
    restServer.listen(restPort, () => {
      global.console.log(`Rest server ready at http://localhost:${restPort}`);
    });
  };
};

server(rest(context))();
