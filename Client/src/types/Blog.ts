export interface BlogFormData {
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    department: string;
    email: string;
    imageUrl: string | File;
  };
  coverImage: string | File;
  status: 'draft' | 'published';
}

export interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    department: string;
    email: string;
    imageUrl: string;
  };
  coverImage: string;
  publishedDate: string;
  status: 'draft' | 'published';
  claps: number;
  slug: string;
}