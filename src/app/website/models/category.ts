import { Product } from "./product"

export class Category {
  constructor(
    public id: number, 
    public key: string, 
    public name: string, 
    public products: Array<Product>
  ) {}
}