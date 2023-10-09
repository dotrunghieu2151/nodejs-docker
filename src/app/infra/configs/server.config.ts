import { Service } from 'typedi';

@Service()
export class ServerConfig {
  get Port(): number {
    return Number(process.env.PORT ?? 3000);
  }

  get Host(): string {
    return process.env.HOST ?? '0.0.0.0';
  }
}
