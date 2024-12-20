const BASE_URL = import.meta.env.PROD 
  ? 'https://gavel-club.azurewebsites.net/api'
  : '/api';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
  
  logout: async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Important for cookies
    });
    if (!response.ok) throw new Error('Logout failed');
    return response.json();
  }
};

export const eventsApi = {
  createEvent: async (formData: FormData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create event');
    }
    return response.json();
  },

  getAllEvents: async () => {
    try {
      const response = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch events');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  },

  updateEvent: async (id: string, formData: FormData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update event');
    }
    return response.json();
  },

  deleteEvent: async (id: string) => {
    if (!id) {
      throw new Error('Event ID is required');
    }
  
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete event');
    }
  
    return await response.json();
  }
};

export const teamApi = {
  getAllMembers: async () => {
    const response = await fetch(`${BASE_URL}/team`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch team members');
    return response.json();
  },

  createMember: async (formData: FormData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BASE_URL}/team`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to create team member');
    return response.json();
  },

  updateMember: async (id: string, formData: FormData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BASE_URL}/team/${id}`, {
      method: 'PUT', 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to update team member');
    return response.json();
  },

  deleteMember: async (id: string) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete team member');
    return response.json();
  }
};

export const specialEventApi = {
  getSpecialEvent: async () => {
    try {
      const response = await fetch(`${BASE_URL}/special-event`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch special event');
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  createSpecialEvent: async (formData: FormData) => {
    try {
      const response = await fetch(`${BASE_URL}/special-event`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to create special event');
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  updateSpecialEvent: async (id: string, formData: FormData) => {
    try {
      const response = await fetch(`${BASE_URL}/special-event/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to update special event');
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('adminToken');
  
  // Don't set Content-Type for FormData
  const headers = options.body instanceof FormData 
    ? { 'Authorization': `Bearer ${token}` }
    : {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      };

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Add credentials
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API Error: ${errorData.message || response.statusText}`);
  }

  return response.json();
};

export const galleryApi = {
  getAllImages: async () => {
    try {
      const response = await fetch(`${BASE_URL}/gallery`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch gallery images');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  },

  uploadImage: async (formData: FormData) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BASE_URL}/gallery`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to upload image');
      }
      return response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  deleteImage: async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BASE_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to delete image');
      }
      return response.json();
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

export const membershipApi = {
  getConfig: async () => {
    try {
      const response = await fetch(`${BASE_URL}/membership/config`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch config');
      return response.json();
    } catch (error) {
      console.error('Error fetching config:', error);
      throw error;
    }
  },

  updateConfig: async (config: {
    isOpen: boolean;
    formUrl: string;
    closeDate: string;
  }, token: string) => {
    if (!token) {
      throw new Error('No authentication token provided');
    }

    try {
      const response = await fetch(`${BASE_URL}/membership/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(config)
      });

      if (response.status === 403) {
        throw new Error('Not authorized - please login again');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update config');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating config:', error);
      throw error;
    }
  }
};