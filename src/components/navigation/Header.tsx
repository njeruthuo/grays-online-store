import { RootState } from "@/state/store/store";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state: RootState) => state.productReducer.cart);
  return (
    <section className="w-full p-4 px-22 bg-green-600 text-white font-bold text-xl">
      <div className="flex justify-between place-items-center">
        <div className="kumar-one-regular font-bold text-2xl">
          Grays online store
        </div>

        <div className="bg-white hover:cursor-pointer rounded-full p-2 relative w-12 h-12 flex items-center justify-center shadow-md">
          <img src="/shopping_cart_26dp.svg" alt="Cart" className="w-6 h-6" />

          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Header;
