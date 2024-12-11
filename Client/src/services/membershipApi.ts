const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const membershipApi = {
  getConfig: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/membership/config`, {
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

    console.log('Token being used:', token); // Debug log

    try {
      const response = await fetch(`${BASE_URL}/api/membership/config`, {
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