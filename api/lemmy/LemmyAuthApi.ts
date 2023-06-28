import { LemmyHttp, Login as LemmyLogin } from 'lemmy-js-client';
import { Account } from '@models/Account';
import { InstanceType } from '@models/InstanceType';
import * as Crypto from 'expo-crypto';


export class LemmyAuthApi {
  static async login(domain: string, username: string, password: string): Promise<Account> {
    const client = new LemmyHttp('https://' + domain);

    let params: LemmyLogin = { username_or_email: username, password };

    let resp = await client.login(params);

    return {
      localId: username.toLowerCase() + '.' + domain.toLowerCase(),
      username,
      displayName: username,
      instanceDomain: domain,
      instanceType: InstanceType.LEMMY,
      token: resp.jwt
    }
  }
}