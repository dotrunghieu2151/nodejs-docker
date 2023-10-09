import { Inject, Service } from 'typedi';

import { IServer } from './core/interfaces/server.interface';
import { ExpressServer } from './server';

@Service()
export class App {
  constructor(
    @Inject(() => ExpressServer)
    private readonly server: IServer,
  ) {}

  async start() {
    this.server.listen();
  }

  get httpServer() {
    return this.server.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
