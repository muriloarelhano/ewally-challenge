import { join } from 'path';
import { DataSource } from 'typeorm';
import { logger } from './logger';

const databaseClient = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'ewally',
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../domain/entities/**/*.ts')],
});

(() => {
  databaseClient
    .initialize()
    .then(() => {
      logger.info('Database connect with success');
    })
    .catch(() => {
      logger.error('Error to connect database');
    });
})();

export { databaseClient };
