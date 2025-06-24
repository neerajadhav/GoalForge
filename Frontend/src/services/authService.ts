import type { AuthTokens, LoginCredentials, RegisterCredentials, User } from '../types/auth';

import ENV from '../config/env';

const API_BASE_URL = ENV.API_BASE_URL;

class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private getAuthHeaders(): HeadersInit {
    const tokens = this.getStoredTokens();
    return tokens ? { Authorization: `Bearer ${tokens.access_token}` } : {};
  }

  // Token management
  storeTokens(tokens: AuthTokens): void {
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  }

  getStoredTokens(): AuthTokens | null {
    const tokens = localStorage.getItem('auth_tokens');
    return tokens ? JSON.parse(tokens) : null;
  }

  clearTokens(): void {
    localStorage.removeItem('auth_tokens');
  }

  // API calls
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const tokens = await this.request<AuthTokens>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    this.storeTokens(tokens);
    return tokens;
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me', {
      headers: this.getAuthHeaders(),
    });
  }

  async logout(): Promise<void> {
    this.clearTokens();
  }

  // Utility methods
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  isAuthenticated(): boolean {
    const tokens = this.getStoredTokens();
    return !!(tokens && !this.isTokenExpired(tokens.access_token));
  }
}

export const authService = new AuthService();
export default authService;
