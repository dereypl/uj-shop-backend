import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { CreateProductDto } from './dto/createProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(product: CreateProductDto) {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async getProducts() {
    return await this.productModel.find().exec();
  }

  async getSingleProduct(id: string) {
    return await this.findProduct(id);
  }

  async updateProduct(
    id: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
  ) {
    const updatedProduct = await this.findProduct(id);
    if (name) updatedProduct.name = name;
    if (price) updatedProduct.price = price;
    if (quantity) updatedProduct.quantity = price;
    if (description) updatedProduct.description = description;
    await updatedProduct.save();
  }

  async deleteProduct(id: string) {
    const { deletedCount } = await this.productModel
      .deleteOne({ _id: id })
      .exec();

    if (deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
