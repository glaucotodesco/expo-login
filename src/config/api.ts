const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.EXPO_PUBLIC_API_URL || 'https://api.yourapp.com';
  }
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  ENDPOINTS: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    TEST_ALL: '/test/all',
    TEST_USER: '/test/user',
    TEST_ADMIN: '/test/admin',
  },
};