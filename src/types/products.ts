export interface IProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  brand: {
    id: number;
    name: string;
  };
  category: ICategories;
  images: string[];
  stocked: boolean;
}

export interface ICategories {
  id: number;
  name: string;
}

export interface IBrands{
  name:string;
  id:number;
}

interface CartItem {
  quantity: number;
  product: IProduct;
}

export interface ProductState {
  products: IProduct[];
  cart: CartItem[];
  filteredProducts: IProduct[];
}

export interface ICategories {
  id: number;
  name: string;
}
