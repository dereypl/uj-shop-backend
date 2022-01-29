import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() CreateProductDto: CreateProductDto) {
    const result = await this.productsService.insertProduct(CreateProductDto);
    return { result };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
    @Body('description') description: string,
  ) {
    await this.productsService.updateProduct(
      id,
      name,
      price,
      quantity,
      description,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
    return null;
  }
}
