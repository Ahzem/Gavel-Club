import { Blog, BlogFormData, BlogPost } from '../types/Blog';
import { fetchWithAuth } from './api';

export const blogService = {
    async getBlogs(filters?: { status?: string; search?: string }): Promise<Blog[]> {
        const queryParams = new URLSearchParams();
        if (filters?.status && filters.status !== 'all') {
          queryParams.append('status', filters.status);
        }
        if (filters?.search) {
          queryParams.append('search', filters.search);
        }
        
        return await fetchWithAuth(`blogs?${queryParams.toString()}`);
      },

async createBlog(data: BlogFormData) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('subtitle', data.subtitle);
  formData.append('content', data.content);
  formData.append('status', data.status);
  formData.append('author', JSON.stringify({
    name: data.author.name,
    department: data.author.department,
    linkedin: data.author.linkedin
  }));

  if (data.coverImage instanceof File) {
    formData.append('coverImage', data.coverImage);
  }
  if (data.author.imageUrl instanceof File) {
    formData.append('authorImage', data.author.imageUrl);
  }

  return await fetchWithAuth('blogs', {
    method: 'POST',
    body: formData,
  });
},

async updateBlog(id: string, data: BlogFormData) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('subtitle', data.subtitle);
  formData.append('content', data.content);
  formData.append('status', data.status);
  formData.append('author', JSON.stringify({
    name: data.author.name,
    department: data.author.department,
    linkedin: data.author.linkedin
  }));

  if (data.coverImage instanceof File) {
    formData.append('coverImage', data.coverImage);
  }
  if (data.author.imageUrl instanceof File) {
    formData.append('authorImage', data.author.imageUrl);
  }

  return await fetchWithAuth(`blogs/${id}`, {
    method: 'PUT',
    body: formData,
  });
},

  async deleteBlog(id: string) {
    await fetchWithAuth(`blogs/${id}`, {
      method: 'DELETE',
    });
  },

  async updateBlogStatus(id: string, status: 'draft' | 'published') {
    const response = await fetchWithAuth(`blogs/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return response;
  },

    async getPublishedBlogs(): Promise<BlogPost[]> {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${BASE_URL}/api/blogs/published`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
    },

  async getBlogBySlug(slug: string): Promise<BlogPost> {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${BASE_URL}/api/blogs/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return response.json();
  },

  async updateClaps(id: string): Promise<BlogPost> {
    return await fetchWithAuth(`blogs/${id}/clap`, {
      method: 'PUT',
    });
  }
};