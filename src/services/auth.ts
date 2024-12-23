import axios from 'axios';

const AUTH_TOKEN_KEY = 'vcrm_auth_token';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  fullName: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

const authApi = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export const auth = {
  async login(credentials: LoginCredentials) {
    try {
      const params = new URLSearchParams();
      params.append('username', credentials.email);
      params.append('password', credentials.password);
      
      const response = await authApi.post<AuthResponse>('/token', params);
      const { access_token } = response.data;
      localStorage.setItem(AUTH_TOKEN_KEY, access_token);
      return access_token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Login failed');
      }
      throw error;
    }
  },

  async register(data: RegisterData) {
    try {
      await authApi.post('/register', {
        email: data.email,
        password: data.password,
        full_name: data.fullName,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Registration failed');
      }
      throw error;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = '/login';
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};