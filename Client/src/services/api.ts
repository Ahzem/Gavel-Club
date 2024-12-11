const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
  
  logout: async () => {
    const response = await fetch('/api/auth/logout', {
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
    const response = await fetch(`${BASE_URL}/api/events`, {
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
      const response = await fetch(`${BASE_URL}/api/events`, {
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
    const response = await fetch(`${BASE_URL}/api/events/${id}`, {
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
    const response = await fetch(`${BASE_URL}/api/events/${id}`, {
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