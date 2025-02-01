import React from "react";
import { Link } from "react-router-dom";

import { IProduct } from "@/types/products";
import ImageCarousel from "./ImageSlider";
import AddToCart from "./AddToCart";

const ProductCard: React.FC<IProduct> = ({
  id,
  // brand,
  // category,
  description,
  images,
  name,
  price,
  stocked,
}) => {
  return (
    <section className="w-1/3 shadow-2xl rounded p-2 text-center bg-[#F6F5AE]">
      <Link to={`/details/${id}`}>
        <div>
          <div>
            <ImageCarousel images={images} />
          </div>
          <p className="font-bold  mt-2 text-xl text-gray-800">{name}</p>
          <p className="text-sm">{description}</p>
          <p className="text-lg my-2 font-bold text-blue-600">Kshs. {price}</p>
          <div className="flex items-center mb-4 justify-center">
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

      <AddToCart />
    </section>
  );
};
export default ProductCard;
