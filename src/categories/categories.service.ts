import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertCategory(name: string) {
    const newCategory = new this.categoryModel({ name, products: [] });
    return await newCategory.save();
  }

  async getCategories() {
    return await this.categoryModel.find().exec();
  }

  async getSingleCategory(id: string) {
    return await this.findCategory(id, true);
  }

  async updateCategory(id: string, name: string, products: string[]) {
    const updatedCategory = await this.findCategory(id);
    if (name) updatedCategory.name = name;
    if (products) {
      // @ts-ignore
      updatedCategory.products = products;
    }
    await updatedCategory.save();
  }

  async deleteCategory(id: string) {
    const { deletedCount } = await this.categoryModel
      .deleteOne({ _id: id })
      .exec();

    if (deletedCount === 0) {
      throw new NotFoundException('Could not find category.');
    }
  }

  private async findCategory(id: string, populate = false): Promise<Category> {
    let category;
    try {
      if (populate) {
        category = await this.categoryModel
          .findById(id)
          .populate('products')
          .exec();
      } else category = await this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find category.');
    }
    return category;
  }
}
