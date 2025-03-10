import { useMemo } from "react";
import { useSelector } from "react-redux";

import { SearchBar } from "../search";
import { ProductCard } from "../products";
import { LoaderIcon } from "lucide-react";
import {
  filteredProducts,
  productList,
} from "@/state/features/products/productSlice";
import { useFetchProductsQuery } from "@/state/features/products/productApi";

const ProductList = () => {
  const { isLoading } = useFetchProductsQuery(null);

  const products = useSelector(productList);

  const filteredProductList = useSelector(filteredProducts);

  const data = useMemo(() => {
    if (filteredProductList.length > 0) return filteredProductList;
    return products;
  }, [products, filteredProductList]);

  return (
    <section className="flex flex-col sm:space-y-6 rounded-lg">
      <div className="card-color p-3 flex">
        <div className="flex justify-center w-full rounded-md">
          <SearchBar />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col space-y-4 justify-center items-center h-[60vh]">
          <LoaderIcon size={70} className="animate-spin text-blue-500" />

          <p>Loading products....</p>
        </div>
      ) : (
        <div className="sm:p-3 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {data?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
