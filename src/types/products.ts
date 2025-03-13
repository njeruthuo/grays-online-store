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

export interface IBrands {
  name: string;
  id: number;
}

interface CartItem {
  quantity: number;
  product: IProduct;
}

export interface ProductState {
  products: IProduct[];
  cart: CartItem[];
  filteredProducts: IProduct[];
  count: number;
  next: null | string;
  previous: null | string;
  filterNext: null | string;
  filterPrevious: null | string;
  filterCount: number;
}

export interface ICategories {
  id: number;
  name: string;
}

export interface IResponseType {
  results: IProduct[];
  count: number;
  next: null | string;
  previous: null | string;
}
