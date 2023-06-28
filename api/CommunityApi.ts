import { Community } from '@models/Community';
import { Account } from '@models/Account';
import { ApiBase } from './ApiBase';

export abstract class CommunityApi extends ApiBase {
  account: Account;
  constructor(account: Account) {
    super();
    this.account = account;
  }

  abstract list(): Promise<Community[]>
}