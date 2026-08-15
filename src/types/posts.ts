export interface PostMetadata {
  date: string;
  excerpt: string;
  title: string;
}

export interface PostResume {
  path: string;
  slug: string;
}

export interface Post extends PostResume {
  metadata: PostMetadata;
}
