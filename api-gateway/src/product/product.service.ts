import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ProductDto } from 'src/model/productDto';

@Injectable()
export class ProductService {
  private readonly apiUrl = 'http://127.0.0.1:5000/api/products';

  constructor(private readonly httpService: HttpService) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const response = await lastValueFrom(this.httpService.get<ProductDto[]>(this.apiUrl));
    return response.data;
  }

  async getProductById(id: string): Promise<ProductDto> {
    try {
      const response = await lastValueFrom(this.httpService.get<ProductDto>(`${this.apiUrl}/${id}`));
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  async createProduct(product: ProductDto): Promise<ProductDto> {
    const response = await lastValueFrom(this.httpService.post<ProductDto>(this.apiUrl, product));
    return response.data;
  }

  async updateProduct(id: string, updatedProduct: Partial<ProductDto>): Promise<ProductDto> {
    try {
      await lastValueFrom(this.httpService.put(`${this.apiUrl}/${id}`, updatedProduct));
      return this.getProductById(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await lastValueFrom(this.httpService.delete(`${this.apiUrl}/${id}`));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }
}