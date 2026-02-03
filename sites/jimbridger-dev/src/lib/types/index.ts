export type DiscussionCommentType = {
   id: string,
   body: string,
   createdAt: string,
   updatedAt: string,
   author: { login: string }
}

export type DevToArticle = {
   body_markdown: string,
   canonical_url: string,
   comments_count: number,
   cover_image: string,
   description: string,
   id: number,
   page_views_count: number,
   path: string,
   positive_reactions_count: number,
   public_reactions_count: number,
   published: boolean,
   published_at: string,
   published_timestamp: string,
   reading_time_minutes: number,
   slug: string,
   tag_list: string[],
   title: string,
   type_of: string,
   url: string,
   user: DevToUser
}

type DevToUser = {
   name: string,
   username: string,
   github_username: string,
   user_id: number,
   website_url: string,
   profile_image: string,
   profile_image_90: string
}
