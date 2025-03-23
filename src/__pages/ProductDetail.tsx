import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AddToCart, AlreadyCarted } from "@/components/cart";
import {
  cartItemsList,
  productList,
} from "@/state/features/products/productSlice";
import { Images } from "@/components/products";
import CurrencyConverter from "@/utils/currencyConverter";

const ProductDetail = () => {
  const cartItems = useSelector(cartItemsList);
  const { id } = useParams();

  const productId = id ? parseInt(id, 10) : null;

  const isProductInCart = cartItems.some(
    (item) => item.product.id == productId
  );

  const itemCount =
    cartItems.find((item) => item.product.id === productId)?.quantity || 0;

  const selectedProduct = useSelector(productList).find(
    (product) => product?.id === productId
  );

  return (
    <section className="mx-auto w-[90%] py-2 pt-2 ">
      <h2 className="product-header text-center text-gray-800">
        {selectedProduct?.name}
      </h2>
      <div className="flex flex-col sm:flex-row space-x-10 justify-center mt-4">
        <div className="card-color rounded-xl flex border justify-end sm:w-1/3 w-full">
          {selectedProduct?.images && (
            <Images images={selectedProduct?.images} />
          )}
        </div>

        <div>
          <p className="text-lg my-2 font-bold text-blue-600">
            <CurrencyConverter priceInUSD={Number(selectedProduct?.price)} />
          </p>

          <div className="space-y-3">
            <p>Brand: {selectedProduct?.brand.name} </p>
            <p>Category: {selectedProduct?.category.name} </p>
            {selectedProduct?.stocked ? (
              <div className="flex place-items-center space-x-2">
                <input
                  type="checkbox"
                  name=""
                  checked={selectedProduct?.stocked}
                  id=""
                />
                <p>In stock</p>
              </div>
            ) : (
              <p className="text-red-500">Out of stock 📉</p>
            )}
            <p className="text-sm my-2">{selectedProduct?.description}</p>
          </div>

          <div className="mt-5">
            {selectedProduct ? (
              isProductInCart ? (
                <AlreadyCarted
                  product={selectedProduct}
                  quantity={itemCount ?? 1}
                />
              ) : (
                <AddToCart product={selectedProduct} />
              )
            ) : null}
          </div>
        </div>
      </div>

      {/* <div className="block my-5">
        <h2 className="product-header">Reviews</h2>
        <p>No reviews available</p>
      </div>

      <div>
        <h2 className="product-header">Related products</h2>
        <div>
          <RelatedProducts />
        </div>
      </div> */}
    </section>
  );
};

export default ProductDetail;
