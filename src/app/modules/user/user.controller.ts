import { Inject, Service } from 'typedi';

import { ILogger } from '@/app/core/interfaces/logger.interface';
import { WinstonLogger } from '@/app/infra/logger/winston-logger';

import { IAuthUser } from './dtos/response/auth-user.response';
import { ICreateUser } from './interfaces/create-user.interface';
import { UserService } from './services/user.service';

@Service()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(() => WinstonLogger)
    private readonly logger: ILogger,
  ) {}

  async createUser(id: string, data: ICreateUser): Promise<IAuthUser> {
    this.logger.info(`Creating user: ${id}`);
    return { id, ...data };
  }
}
