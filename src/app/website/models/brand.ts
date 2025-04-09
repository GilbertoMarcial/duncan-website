import { Line } from "./line";

export class Brand {
  constructor(
    public id: number,
    public key: string, 
    public name: string,
    public website: string,
    public about: any,
    public bg_color_1: string, 
    public bg_color_2: string, 
    public bg_image: string, 
    public lines: Array<Line>
  ) {}
}