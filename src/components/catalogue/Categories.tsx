import { useSelector } from "react-redux";

import { IProduct } from "@/types/products";
import { productList } from "@/state/features/products/productSlice";

import { BrandFilter, CategoryFilter, Slider } from "../filters";

const Categories = () => {
  const checkLargestPrice = (args: IProduct[]) => {
    return args.reduce((largest, product) => {
      const price = Number(product.price);
      return price > largest ? price : largest;
    }, 0);
  };

  const allProducts = useSelector(productList);

  return (
    <div className="card-color h-[800px] relative overflow-y-auto p-4">
      <div>
        <div className="category-header sticky top-0">SHOP BY</div>
        <div className="category-container">
          <div>
            <h2 className="font-bold">Category</h2>
            <div>
              <CategoryFilter />
            </div>
          </div>

          <div>
            <h2>Price</h2>
            <div>
              <Slider maxPrice={checkLargestPrice(allProducts)} />
            </div>
          </div>

          <div>
            <h2>Brand</h2>
            <div>
              <BrandFilter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;
