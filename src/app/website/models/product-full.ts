export class Product {
  constructor(
    public id: number,
    public key: string, 
    public name: string,
    public subname: string,
    public description: string,
    public benefits: string,
    public accesories: string,
    public related: any
  ) {}
}