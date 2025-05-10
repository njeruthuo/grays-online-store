import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AddToCart, AlreadyCarted } from "@/components/cart";
import {
  cartItemsList,
  // productList,
} from "@/state/features/products/productSlice";
import { Images } from "@/components/products";
// import CurrencyConverter from "@/utils/currencyConverter";
import { formatNumber } from "@/utils/numberFormatter";
import { useGetProductDetailsQuery } from "@/state/features/products/productApi";
// import { Spinner } from "@/components/spinner";
import { Loader2Icon } from "lucide-react";

const ProductDetail = () => {
  const cartItems = useSelector(cartItemsList);
  const { id } = useParams();

  // console.log(id);

  const productId = id ? parseInt(id, 10) : null;

  const isProductInCart = cartItems.some(
    (item) => item.product.id == productId
  );

  const itemCount =
    cartItems.find((item) => item.product.id === productId)?.quantity || 0;

  // const selectedProduct = useSelector(productList).find(
  //   (product) => product?.id === productId
  // );

  const { data: Product, isLoading } = useGetProductDetailsQuery(Number(id));

  return (
    <section className="mx-auto w-[90%] py-2 pt-2 ">
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader2Icon color="blue" className="animate-spin" />
        </div>
      ) : (
        <>
          <h2 className="product-header text-center text-gray-800">
            {Product?.name}
          </h2>
          <div className="flex flex-col sm:flex-row space-x-10 justify-center mt-4">
            <div className="card-color rounded-xl flex border justify-end sm:w-1/3 w-full">
              {Product?.images && <Images images={Product?.images} />}
            </div>

            <div>
              <p className="text-lg my-2 font-bold text-blue-600">
                KES {formatNumber(Number(Product?.price))}
                {/* <CurrencyConverter priceInUSD={Number(selectedProduct?.price)} /> */}
              </p>

              <div className="space-y-3">
                <p>Brand: {Product?.brand.name} </p>
                <p>Category: {Product?.category.name} </p>
                {Product?.stocked ? (
                  <div className="flex place-items-center space-x-2">
                    <input
                      type="checkbox"
                      name=""
                      checked={Product?.stocked}
                      id=""
                    />
                    <p>In stock</p>
                  </div>
                ) : (
                  <p className="text-red-500">Out of stock 📉</p>
                )}
                <p className="text-sm my-2">{Product?.description}</p>
              </div>

              <div className="mt-5">
                {Product ? (
                  isProductInCart ? (
                    <AlreadyCarted
                      product={Product}
                      quantity={itemCount ?? 1}
                    />
                  ) : (
                    <AddToCart product={Product} />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
