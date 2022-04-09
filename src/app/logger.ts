import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
  ),
  defaultMeta: { service: process.env.APPLICATION_NAME },
  transports: [
    new transports.File({ filename: 'application.log' }),
    new transports.Console({
      format: format.combine(format.colorize()),
    }),
  ],
});
