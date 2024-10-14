import cookie from 'react-cookies';

export const setToken = (token) => {
  return cookie.save('auth-token', token);
};

export const getToken = () => {
  return cookie.load('auth-token') || null;
};

export const removeToken = () => {
  return cookie.remove('auth-token', { path: '/' });
};
