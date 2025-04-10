import { Product } from './product';

export class ProductFull {
  constructor(
    public id: number,
    public key: string, 
    public name: string,
    public subname: string,
    public description: string,
    public features: string,
    public benefits: string,
    public accesories: string,
    public related: Array<Product>
  ) {}
}