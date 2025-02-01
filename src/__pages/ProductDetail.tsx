import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { productList } from "@/state/features/products/productSlice";
import {
  AddToCart,
  ImageCarousel,
  RelatedProducts,
} from "@/components/products";

const ProductDetail = () => {
  const { id } = useParams();

  const productId = id ? parseInt(id, 10) : null;

  const selectedProduct = useSelector(productList).find(
    (product) => product?.id === productId
  );

  return (
    <section className="mx-auto w-[90%] py-2 pt-2 ">
      <h2 className="product-header text-center text-gray-800">Product description</h2>
      <div className="flex space-x-10 justify-center mt-4">
        <div className="card-color  rounded-xl flex border justify-end w-1/3">
          {selectedProduct?.images && (
            <ImageCarousel images={selectedProduct?.images} />
          )}
        </div>

        <div>
          <p className="text-2xl">{selectedProduct?.name}</p>
          <p className="text-sm">{selectedProduct?.description}</p>
          <p className="text-lg my-2 font-bold text-blue-600">
            Kshs. {selectedProduct?.price}
          </p>

          <div className="space-y-3">
            <p>Brand: {selectedProduct?.brand.name} </p>
            <p>Category: {selectedProduct?.category.name} </p>
            {selectedProduct?.stocked ? (
              <p>📉 In stock</p>
            ) : (
              <p className="text-red-500">Out of stock 📉</p>
            )}
          </div>

          <div className="mt-5">
            <AddToCart />
          </div>
        </div>
      </div>

      <div className="block my-5">
        <h2 className="product-header">Reviews</h2>
        <p>No reviews available</p>
      </div>

      <div>
        <h2 className="product-header">Related products</h2>
        <div>
          <RelatedProducts />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
