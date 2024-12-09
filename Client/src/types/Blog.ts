export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    title: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    }
  };
  publishedAt: string;
  claps: number;
  readTime: string;
  tags: string[];
}