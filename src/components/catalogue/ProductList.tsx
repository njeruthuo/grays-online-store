import { ProductCard } from "../products";
import { useSelector } from "react-redux";
import { productList } from "@/state/features/products/productSlice";
import { useFetchProductsQuery } from "@/state/features/products/productApi";

const ProductList = () => {
  const { isError } = useFetchProductsQuery(null);
  if (isError) {
    console.log(isError);
  }

  const Products = useSelector(productList);
  return (
    <section className="flex flex-col space-y-6">
      <div className="card-color p-3">
        <p>More filters here</p>
      </div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {Products?.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
