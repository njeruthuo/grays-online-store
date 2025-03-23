import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AlreadyCarted } from "../cart";
import AddToCart from "../cart/AddToCart";
import { IProduct } from "@/types/products";
import CurrencyConverter from "@/utils/currencyConverter";
import { cartItemsList } from "@/state/features/products/productSlice";

const ProductCard: React.FC<IProduct> = (product) => {
  const cartItems = useSelector(cartItemsList);
  const { id, description, images, name, price, stocked } = product;

  const isProductInCart = cartItems.some((item) => item.product.id === id);

  const itemCount =
    cartItems.find((item) => item.product.id === id)?.quantity || 0;

  return (
    <section className="shadow-2xl rounded p-2 text-center product-card-bg">
      <Link to={`/details/${id}`}>
        <div>
          <div>
            <img src={`${images[0]}`} alt="" className="w-full sm:h-44" />
          </div>
          <p className="font-bold  mt-2 text-xl text-gray-800">{name}</p>
          <p className="text-sm">{description}</p>
          <p className="text-lg my-1 font-bold text-blue-600">
            <CurrencyConverter priceInUSD={Number(price)} />
          </p>
          <div className="flex items-center mb-2 justify-center">
            <input
              id="stock-checkbox"
              type="checkbox"
              defaultChecked={stocked}
              className="w-4 h-4 mr-2 accent-blue-500 "
            />
            <label
              htmlFor="stock-checkbox"
              className={`text-sm ${
                stocked ? "text-green-500" : "text-red-500"
              }`}
            >
              {`${stocked ? "" : "Not "}Restocked`}
            </label>
          </div>
        </div>
      </Link>
      {isProductInCart ? (
        <AlreadyCarted product={product} quantity={itemCount} />
      ) : (
        <AddToCart product={product} />
      )}
    </section>
  );
};
export default ProductCard;
