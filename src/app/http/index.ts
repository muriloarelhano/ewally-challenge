import { config } from 'dotenv';
config();
import express from './express';
import { context } from '../context';

const server = (expressServer: any) => {
  const restPort = process.env.REST_PORT || 3000;

  return () => {
    expressServer.listen(restPort, () => {
      global.console.log(`Rest server ready at http://localhost:${restPort}`);
    });
  };
};

server(express(context))();
