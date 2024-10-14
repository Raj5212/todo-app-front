import axios from 'axios';
import { GET } from '../constant';
import * as services from '../service/index';

const BASE_URL = 'https://todo-app-backed-6zer.onrender.com/api/v1/user';
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Cache object to store GET responses
const cache = {};

const getHeaders = () => {
  const token = services.getToken();  
  return {
    'Content-Type': 'application/json', 
    Authorization: `Bearer ${token}`, 
  }
};

// Generate a unique cache key for GET requests
const generateCacheKey = (method, url, data) => {
  return `${method}-${url}-${JSON.stringify(data || {})}`;
};


// Main API Request handler function
const API_REQUEST = async (
  method, 
  url,   
  data = {}, 
  dispatch = null 
) => {
  const headers = getHeaders();
  const cacheKey = generateCacheKey(method, url, data);

  // Cache handling for GET requests
  if (
    method === GET &&
    cache[cacheKey] &&
    Date.now() - cache[cacheKey].timestamp < CACHE_TIMEOUT
  ) {
    return cache[cacheKey].response;
  } else if (method !== GET) {
    Object.keys(cache).forEach((key) => {
      delete cache[key];
    });
  }

  try {
    const response = await axios({
      headers,
      method,
      url: `${BASE_URL}/${url}`,
      data: method !== GET ? data : undefined, // Data is only for non-GET requests
    });

    // Cache the response for GET requests
    if (method === GET) {
      cache[cacheKey] = {
        response,
        timestamp: Date.now(),
      };
    }

    return response; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server Error');
    } else if (error.request) {
      throw new Error('No response from server. Please try again.');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

export default API_REQUEST;
