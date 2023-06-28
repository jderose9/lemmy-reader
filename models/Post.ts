export interface Post {
  id: string;
  name: string;
  url?: string;
  body?: string;
  communityId: string;
  nsfw: boolean;
  embedTitle?: string;
  embedDescription?: string;
  thumbnailUrl?: string;
  embedVideoUrl?: string;
  languageId: string;
  publishedAt: string;
  updatedAt?: string;
  creatorId: string;
  creatorAvatar?: string;
  creatorName?: string,
  creatorInstanceDomain?: string,
  upvoteCount?: number,
  downvoteCount?: number,
  commentCount?: number,
}