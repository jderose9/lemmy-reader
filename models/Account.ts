import { InstanceType } from "./InstanceType";

export interface Account {
  localId: string,
  displayName?: string,
  username: string,
  instanceDomain: string,
  instanceType: InstanceType,
  token?: string;
}

