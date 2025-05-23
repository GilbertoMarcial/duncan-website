import { Category } from "./category";

export class LineBrand {
  constructor (
    public id: number, 
    public key: string, 
    public name: string, 
    public description: any, 
    public categories: Array<Category>
  ) {}
}