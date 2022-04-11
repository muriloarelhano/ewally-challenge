import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
  ),
  defaultMeta: { service: process.env.APPLICATION_NAME },
  transports: [new transports.Console()],
});
