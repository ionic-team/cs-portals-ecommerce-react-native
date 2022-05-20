import { Categories } from "./Categories";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Categories;
}
