import { AuthApi } from "@api/AuthApi";
import { Account } from "@models/Account";
import { InstanceType } from "@models/InstanceType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export class AuthService {

  static async login(domain: string, username: string, password: string, instanceType: InstanceType): Promise<Account> {
    const account = await AuthApi.login(domain, username, password, instanceType);

    const publicAccounts = new Map<string, Account>();
    const publicAccount = Object.assign({}, account);
    delete publicAccount.token;
    await SecureStore.setItemAsync('token_' + account.localId, <string> account.token);
    publicAccounts.set(account.localId, publicAccount);
    await AsyncStorage.setItem('accounts', JSON.stringify(Object.fromEntries(publicAccounts.entries())));
    await AsyncStorage.setItem('currentAccount', account.localId);

    return account;
  }

  static async getAccountsfromStorage(): Promise<Map<string, Account> | undefined> {
    const accountString = await AsyncStorage.getItem('accounts');
    if(!accountString)
      return undefined;

    const accounts = new Map<string, Account>(Object.entries(JSON.parse(accountString)));
    for(let [localId, account] of accounts) {
      account.token = (await SecureStore.getItemAsync('token_' + localId)) || undefined;
    }
    return accounts;
  }

  static async getAccountfromStorage(localId: string): Promise<Account | undefined> {
    const accounts = await this.getAccountsfromStorage();
    return accounts?.get(localId);
  }

  static async getCurrentAccountfromStorage(): Promise<Account | undefined> {
    const currentAccountKey = await AsyncStorage.getItem('currentAccount');
    
    if(!currentAccountKey)
      return undefined;

    const accounts = await this.getAccountsfromStorage();
    return accounts?.get(currentAccountKey);
  }
}