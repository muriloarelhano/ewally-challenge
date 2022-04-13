import { context } from '../context';
import express from './express';
import { config } from 'dotenv';
config();

const server = (expressServer: any) => {
  const restPort = process.env.REST_PORT || 3000;

  return () => {
    expressServer.listen(restPort, () => {
      global.console.log(`Rest server ready at http://localhost:${restPort}`);
    });
  };
};

server(express(context))();
