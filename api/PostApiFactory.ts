import { Community } from '@models/Community';
import { InstanceType } from '@models/InstanceType';
import { LemmyPostApi } from './lemmy/LemmyPostApi';
import { CommunityApi } from './CommunityApi';
import { Account } from '@models/Account';

export class PostApiFactory {
  static construct(account: Account): PostApi {
    if(account.instanceType == InstanceType.LEMMY)
      return new LemmyPostApi(account);

    throw new Error("Not implemented");
  }
}