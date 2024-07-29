
import axios from 'axios';
import type { ProductsResponse } from '../types/product';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';


class ApiServices {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Função para listar todos os produtos
  public async getAllProducts() {
    try {
      const response = await this.apiClient.get('/products');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      throw error;
    }
  }

  public async searchProducts(searchTerm: string, page: number = 1): Promise<ProductsResponse> {
    try {
      const response = await this.apiClient.get('/products', {
        params: { search: searchTerm, page }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Função para criar um novo produto
  public async createProduct(productData: any) {
    try {
      const response = await this.apiClient.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  // Função para criar uma nova categoria
  public async createCategory(categoryData: any) {
    try {
      const response = await this.apiClient.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  }

  // Função para atualizar um produto existente
  public async updateProduct(id: number, productData: any) {
    try {
      const response = await this.apiClient.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  // Função para excluir um produto
  public async deleteProduct(id: number) {
    try {
      const response = await this.apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error;
    }
  }
}

export default new ApiServices();
