import { Post } from '@models/Post';
import { Account } from '@models/Account';
import { ApiBase } from './ApiBase';

export abstract class PostApi extends ApiBase {
  account: Account;
  constructor(account: Account) {
    super();
    this.account = account;
  }

  abstract list(): Promise<Post[]>
}