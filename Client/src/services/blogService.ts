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
    // Validate author data
    if (!data.author?.name || !data.author?.linkedin) {
      throw new Error('Author name and LinkedIn are required');
    }
  
    const formData = new FormData();
  
    // Blog fields
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle || '');
    formData.append('content', data.content);
    formData.append('status', data.status);
  
    // Author data as separate fields, not nested
    formData.append('author.name', data.author.name.trim());
    formData.append('author.department', data.author.department || '');
    formData.append('author.linkedin', data.author.linkedin.trim());
    
    if (typeof data.author.imageUrl === 'string') {
      formData.append('author.imageUrl', data.author.imageUrl);
    }
  
    // File handling
    if (data.coverImage instanceof File) {
      formData.append('coverImage', data.coverImage);
    }
    if (data.author.imageUrl instanceof File) {
      formData.append('authorImage', data.author.imageUrl);
    }
  
    const response = await fetchWithAuth(`blogs/${id}`, {
      method: 'PUT',
      body: formData
    });
  
    return response;
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
       const BASE_URL = import.meta.env.PROD 
      ? 'https://gavel-club.azurewebsites.net/api'
      : '/api';
    const response = await fetch(`${BASE_URL}/blogs/published`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
    },

  async getBlogBySlug(slug: string): Promise<BlogPost> {
        const BASE_URL = import.meta.env.PROD 
      ? 'https://gavel-club.azurewebsites.net/api'
      : '/api';
    const response = await fetch(`${BASE_URL}/blogs/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return response.json();
  },

  async updateClaps(id: string): Promise<BlogPost> {
    return await fetchWithAuth(`blogs/${id}/clap`, {
      method: 'PUT',
    });
  },

  // create blog without authentication
  async createBlogWithoutAuth(data: BlogFormData) {
    const formData = new FormData();
    
    // Required fields
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle || '');
    formData.append('content', data.content);
    formData.append('status', 'draft');
    
    // Author information
    const authorData = {
      name: data.author.name,
      department: data.author.department || '',
      linkedin: data.author.linkedin || '',
      imageUrl: ''
    };
    formData.append('author', JSON.stringify(authorData));
  
    // Handle file uploads
    if (data.coverImage instanceof File) {
      formData.append('coverImage', data.coverImage);
    } else if (typeof data.coverImage === 'string') {
      formData.append('coverImageUrl', data.coverImage);
    }
  
    if (data.author.imageUrl instanceof File) {
      formData.append('authorImage', data.author.imageUrl);
    } else if (typeof data.author.imageUrl === 'string') {
      formData.append('authorImageUrl', data.author.imageUrl);
    }
  
    const BASE_URL = import.meta.env.PROD 
      ? 'https://gavel-club.azurewebsites.net/api'
      : '/api';
  
    try {
      const response = await fetch(`${BASE_URL}/blogs/submit-draft`, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit draft');
      }
  
      return response.json();
    } catch (error) {
      console.error('Submit draft error:', error);
      throw error;
    }
  }
};