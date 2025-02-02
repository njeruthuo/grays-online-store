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

interface CartItem {
  quantity: number;
  product: IProduct;
}

export interface ProductState {
  products: IProduct[];
  cart: CartItem[];
}
