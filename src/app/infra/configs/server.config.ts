import { Service } from 'typedi';

@Service()
export class ServerConfig {
  get Port(): number {
    return Number(process.env.APP_PORT ?? 3000);
  }

  get Host(): string {
    return process.env.APP_HOST ?? '0.0.0.0';
  }
}
