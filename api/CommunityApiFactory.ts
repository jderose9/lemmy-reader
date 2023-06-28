import { Community } from '@models/Community';
import { InstanceType } from '@models/InstanceType';
import { LemmyCommunityApi } from './lemmy/LemmyCommunityApi';
import { CommunityApi } from './CommunityApi';
import { Account } from '@models/Account';

export class CommunityApiFactory {
  static construct(account: Account): CommunityApi {
    if(account.instanceType == InstanceType.LEMMY)
      return new LemmyCommunityApi(account);

    throw new Error("Not implemented");
  }
}