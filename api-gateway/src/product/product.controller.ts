import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') idProduct: string) {
    return await this.productService.getProductById(idProduct);
  }

  @Post()
  async createProduct(@Body() product: { idProduct: string, name: string, category: string, price: number }) {
    return await this.productService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(@Param('id') idProduct: string, @Body() updatedProduct: Partial<{ name: string, category: string, price: number }>) {
    return await this.productService.updateProduct(idProduct, updatedProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') idProduct: string) {
    await this.productService.deleteProduct(idProduct);
    return { message: `Product with ID ${idProduct} deleted successfully` };
  }
}