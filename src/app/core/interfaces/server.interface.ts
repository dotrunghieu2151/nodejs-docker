import * as http from 'http';

export interface IServer {
  listen: () => Promise<void>;
  stop: () => Promise<void>;
  getHTTPServer: () => http.Server;
}
