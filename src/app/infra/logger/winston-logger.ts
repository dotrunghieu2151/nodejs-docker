import { Service } from 'typedi';
import winston, { Logger as WinstonLoggerType } from 'winston';

import { ILogger } from '@/app/core/interfaces/logger.interface';

// enum Levels {
//   DEBUG = 'debug',
//   ERROR = 'error',
//   INFO = 'info',
// }

@Service()
export class WinstonLogger implements ILogger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console(),
        // new winston.transports.File({
        //   filename: `logs/${Levels.DEBUG}.log`,
        //   level: Levels.DEBUG,
        // }),
        // new winston.transports.File({
        //   filename: `logs/${Levels.ERROR}.log`,
        //   level: Levels.ERROR,
        // }),
        // new winston.transports.File({
        //   filename: `logs/${Levels.INFO}.log`,
        //   level: Levels.INFO,
        // }),
      ],
    });
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  error(message: string | Error) {
    this.logger.error(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
}
