import { useDispatch } from "react-redux";

import { IProduct } from "@/types/products";
import {
  addToCart,
  //   removeFromCart,
  reduceCartQuantity,
} from "@/state/features/products/productSlice";

const AlreadyCarted = ({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}) => {
  const dispatch = useDispatch();
  return (
    <div className="rounded flex justify-center gap-2 bg-orange-600 text-white text py-2 text-center hover:cursor-pointer w-full">
      <div className="flex space-x-6 place-items-center">
        <img
          onClick={() => dispatch(reduceCartQuantity(product))}
          src="/remove_26dp.svg"
          alt=""
          className=""
        />
        <span>{quantity}</span>
        <img
          onClick={() => dispatch(addToCart(product))}
          src="/add_26dp.svg"
          alt=""
        />
      </div>
    </div>
  );
};
export default AlreadyCarted;
