import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SearchBar } from "../search";
import { ProductCard } from "../products";
import { fetchProducts, resetProducts } from "./reducers/productFetch";
import { RootState } from "@/state/store/store";
import { AppDispatch } from "@/state/store/store";
import { IProduct } from "@/types/products";

const ProductList = () => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { items, page, hasMore, status } = useSelector(
    (state: RootState) => state.productFetch
  );

  // Fetch products when searchText changes
  useEffect(() => {
    dispatch(resetProducts()); // Reset product list
    dispatch(fetchProducts({ page: 1, searchText })); // Fetch with search
  }, [dispatch, searchText]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      status !== "loading"
    ) {
      dispatch(fetchProducts({ page, searchText }));
    }
  }, [dispatch, hasMore, page, searchText, status]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, status, handleScroll]);

  return (
    <section className="flex flex-col sm:space-y-6 rounded-lg relative min-h-[90vh]">
      <div className="card-color p-3 flex sticky top-15">
        <div className="flex justify-center w-full rounded-md ">
          <SearchBar setSearchText={setSearchText} searchText={searchText} />
        </div>
      </div>

      <div className="sm:p-3 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-14">
        {items?.map((product: IProduct, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      <div className=" absolute bottom-0 left-0 right-0">
        {hasMore && <h2 className="animate-bounce text-center">Loading...</h2>}
      </div>
    </section>
  );
};

export default ProductList;
