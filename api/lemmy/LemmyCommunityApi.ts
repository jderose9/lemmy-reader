import { LemmyHttp, Login as LemmyLogin } from 'lemmy-js-client';
import { Community } from '@models/Community';
import { CommunityApi } from '@api/CommunityApi';
import { Account } from '@models/Account';

export class LemmyCommunityApi extends CommunityApi {
  async list(): Promise<Community[]> {
    const client = new LemmyHttp(this._domainToUrl(this.account.instanceDomain));
    const resp = await client.listCommunities({auth: this.account.token, limit: 50});

    return resp.communities.map(c => ({
      id: c.community.id.toString(),
      name: c.community.name,
      title: c.community.title,
      description: c.community.description,
      nsfw: c.community.nsfw,
      icon: c.community.icon,
      banner: c.community.banner,
      postingRestrictedToMods: c.community.posting_restricted_to_mods,
      instanceId: c.community.instance_id.toString()
    }));
  }
}