import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body('name') name: string) {
    const result = await this.categoriesService.insertCategory(name);
    return { result };
  }

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.getSingleCategory(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('products') products: string[],
  ) {
    await this.categoriesService.updateCategory(id, name, products);
    return null;
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    await this.categoriesService.deleteCategory(id);
    return null;
  }
}
