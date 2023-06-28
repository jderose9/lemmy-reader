export interface Community {
  id: string,
  name: string,
  title?: string;
  description?: string;
  nsfw?: boolean;
  icon?: string;
  banner?: string;
  postingRestrictedToMods?: boolean;
  instanceId?: string;
}