import { useDispatch } from "react-redux";

import { IProduct } from "@/types/products";
import { addToCart } from "@/state/features/products/productSlice";

const AddToCart = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="rounded flex justify-center gap-2 bg-blue-600 text-white text py-2 text-center hover:cursor-pointer"
      onClick={() => dispatch(addToCart(product))}
    >
      <span>Add to cart</span>
      <img src="/shopping_cart_26dp.svg" alt="" />
    </div>
  );
};
export default AddToCart;
