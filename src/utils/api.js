/**
 * API utility functions for making HTTP requests
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Default headers for API requests
 */
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {object} headers - Additional headers
 * @returns {Promise} - Response data
 */
export const get = (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'GET',
    headers,
  });
};

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @param {object} headers - Additional headers
 * @returns {Promise} - Response data
 */
export const post = (endpoint, data = {}, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @param {object} headers - Additional headers
 * @returns {Promise} - Response data
 */
export const put = (endpoint, data = {}, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} headers - Additional headers
 * @returns {Promise} - Response data
 */
export const del = (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'DELETE',
    headers,
  });
};

/**
 * PATCH request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @param {object} headers - Additional headers
 * @returns {Promise} - Response data
 */
export const patch = (endpoint, data = {}, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  });
};