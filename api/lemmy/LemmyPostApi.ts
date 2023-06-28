import { LemmyHttp, Login as LemmyLogin } from 'lemmy-js-client';
import { Post } from '@models/Post';
import { PostApi } from '@api/PostApi';
import { Account } from '@models/Account';

export class LemmyPostApi extends PostApi {
  async list(): Promise<Post[]> {
    const client = new LemmyHttp(this._domainToUrl(this.account.instanceDomain));
    const resp = await client.getPosts({auth: this.account.token, limit: 50});

    return resp.posts.map(p => ({
      id: p.post.id.toString(),
      name: p.post.name,
      url: p.post.url,
      body: p.post.body,
      creatorId: p.post.creator_id.toString(),
      communityId: p.post.community_id.toString(),
      nsfw: p.post.nsfw,
      embedTitle: p.post.embed_title,
      embedDescription: p.post.embed_description,
      thumbnailUrl: p.post.thumbnail_url,
      embedVideoUrl: p.post.embed_video_url,
      languageId: p.post.language_id.toString(),
      publishedAt: p.post.published,
      updatedAt: p.post.updated,
      creatorAvatar: p.creator.avatar,
      creatorName: p.creator.display_name,
      upvoteCount: p.counts.upvotes,
      downvoteCount: p.counts.downvotes,
      commentCount: p.counts.comments
    }));
  }
}