import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { SearchBar } from "../search";
import { ProductCard } from "../products";
import { LoaderIcon } from "lucide-react";
import {
  filteredProducts,
  productList,
} from "@/state/features/products/productSlice";
import { useFetchProductsQuery } from "@/state/features/products/productApi";
import { Pagination } from "../navigation";

const ProductList = () => {
  const [searchText, setSearchText] = useState("");

  const [filterQuery, setFilterQuery] = useState(
    `?page=1&search=${searchText}`
  );

  const { isLoading, isFetching } = useFetchProductsQuery(filterQuery);

  const products = useSelector(productList);

  const filteredProductList = useSelector(filteredProducts);

  function handlePaginationClick(page: number) {
    setFilterQuery(`?page=${page}&search=${searchText}`);
  }

  const data = useMemo(() => {
    if (filteredProductList.length > 0) return filteredProductList;
    return products;
  }, [products, filteredProductList]);

  return (
    <section className="flex flex-col sm:space-y-6 rounded-lg relative min-h-[90vh]">
      <div className="card-color p-3 flex sticky top-15">
        <div className="flex justify-center w-full rounded-md ">
          <SearchBar isFetching={isFetching} setSearchText={setSearchText} />
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="flex flex-col space-y-4 justify-center items-center h-[60vh]">
          <LoaderIcon size={70} className="animate-spin text-blue-500" />

          <p className="animate-pulse">Loading products....</p>
        </div>
      ) : (
        <div className="sm:p-3 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {data?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      )}
      <div className=" absolute bottom-0 left-0 right-0">
        <Pagination onChange={handlePaginationClick} />
      </div>
    </section>
  );
};

export default ProductList;
