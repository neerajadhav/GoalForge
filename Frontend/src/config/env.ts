// Environment configuration
const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  APP_NAME: import.meta.env.VITE_APP_NAME || 'GoalForge',
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const;

export default ENV;
