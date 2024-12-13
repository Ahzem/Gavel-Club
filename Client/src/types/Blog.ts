export interface BlogFormData {
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    department: string;
    linkedin: string;
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
    linkedin: string;
    imageUrl: string;
  };
  coverImage: string;
  publishedDate: string;
  status: 'draft' | 'published';
  claps: number;
  slug: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    department: string;
    linkedin: string;
    imageUrl: string;
  };
  publishedDate: string;
  claps: number;
  status: 'draft' | 'published';
}