export interface IProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  images: string[];
  stocked: boolean;
}

export interface ProductState {
  products: IProduct[];
}
