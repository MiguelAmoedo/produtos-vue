// src/services/authServices.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

class AuthServices {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Register a new user
  public async register(formData: FormData): Promise<any> {
    try {
      const response = await this.apiClient.post('/register', formData);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  }

  // Login an existing user
  public async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.apiClient.post('/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  // Logout the current user
  public async logout(): Promise<any> {
    try {
      const response = await this.apiClient.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  // Get the current user
  public async getUser(): Promise<any> {
    try {
      const response = await this.apiClient.get('/user');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter o usuário:', error);
      throw error;
    }
  }
}

export default new AuthServices();
