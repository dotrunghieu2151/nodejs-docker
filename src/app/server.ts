import * as http from 'http';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { Inject, Service } from 'typedi';

import { ILogger } from './core/interfaces/logger.interface';
import { IServer } from './core/interfaces/server.interface';
import { ServerConfig } from './infra/configs/server.config';
import { WinstonLogger } from './infra/logger/winston-logger';
import { globalErrorMiddleware } from './infra/middlewares/global-error-handler.middleware';
import { ServerRouter } from './router';

@Service()
export class ExpressServer implements IServer {
  private express: express.Express;
  httpServer: http.Server;

  constructor(
    @Inject(() => WinstonLogger)
    private readonly logger: ILogger,
    private readonly serverConfig: ServerConfig,
  ) {
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.set('trust proxy', true);
    this.express.use(helmet());
    this.express.use(cors());
    const serverRouter = ServerRouter();
    this.express.use('/api/v1', serverRouter);
    this.express.use(globalErrorMiddleware(this.logger));
    if (process.env.NODE_ENV === 'development') {
      this.express.use(
        '/doc',
        swaggerUi.serve,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        swaggerUi.setup(require('public/swagger.json')),
      );
    }
    this.httpServer = http.createServer(this.express);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer.listen(
        this.serverConfig.Port,
        this.serverConfig.Host,
        () => {
          this.logger.info(
            `Server started at ${this.serverConfig.Host}:${
              this.serverConfig.Port
            }  in ${this.express.get('env')} mode`,
          );
          resolve();
        },
      );
    });
  }

  getHTTPServer() {
    if (!this.httpServer) {
      throw new Error('Http server is not initialized');
    }
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
