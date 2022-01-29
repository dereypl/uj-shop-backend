import * as mongoose from 'mongoose';
import { Product } from '../products/product.model';

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
  },
  { versionKey: false },
);

export interface Category extends mongoose.Document {
  _id: string;
  name: string;
  products: Product[];
}
