import { useSelector } from "react-redux";

import { IProduct } from "@/types/products";
import { BrandFilter, CategoryFilter, Slider } from "../filters";
import { productList } from "@/state/features/products/productSlice";

const Categories = () => {
  const checkLargestPrice = (args: IProduct[]) => {
    return args.reduce((largest, product) => {
      const price = Number(product.price);
      return price > largest ? price : largest;
    }, 0);
  };

  const allProducts = useSelector(productList);

  return (
    <>
      <div className="card-color">
        <div>
          <div className="category-header">SHOP BY</div>
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
                <BrandFilter products={allProducts} />
              </div>
            </div>

            {/* <div>
              <h2>Color</h2>
              <div></div>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="card-color mt-6">
        <div>
          <div className="category-header">BEST SELLERS</div>
          <div className="category-container">
            <p>A list of most sold products.</p>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Categories;
