import { useMemo } from "react";
import { useSelector } from "react-redux";

import { SearchBar } from "../search";
import { ProductCard } from "../products";
import {
  filteredProducts,
  productList,
} from "@/state/features/products/productSlice";
import { useFetchProductsQuery } from "@/state/features/products/productApi";

const ProductList = () => {
  const { isError } = useFetchProductsQuery(null);
  if (isError) {
    console.log(isError);
  }

  const products = useSelector(productList);

  const filteredProductList = useSelector(filteredProducts);

  // console.log(filteredProductList, "filtered Products list");

  const data = useMemo(() => {
    if (filteredProductList.length > 0) return filteredProductList;
    return products;
  }, [products, filteredProductList]);

  return (
    <section className="flex flex-col space-y-6 rounded-lg">
      <div className="card-color p-3 flex">
        <div className="flex justify-center w-full rounded-md">
          <SearchBar />
        </div>
      </div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {data?.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
