import { Account } from '@models/Account';
import { LemmyAuthApi } from './lemmy/LemmyAuthApi';
import { InstanceType } from '@models/InstanceType';
import { ApiBase } from './ApiBase';


export abstract class AuthApi extends ApiBase {
  static async login(domain: string, username: string, password: string, type: InstanceType): Promise<Account> {
    if(type == InstanceType.LEMMY)
      return LemmyAuthApi.login(domain, username, password);

    throw new Error("Not implemented");
  }
}