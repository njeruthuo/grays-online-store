import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import menuIcon from "@/assets/menu.svg";
import closeIcon from "@/assets/close.svg";
import profileIcon from "@/assets/account.svg";

import { RootState } from "@/state/store/store";

const Header: React.FC<HeaderPropTypes> = ({ openFilterBar }) => {
  const cart = useSelector((state: RootState) => state.productReducer.cart);

  const showFilters = useSelector(
    (state: RootState) => state.themeReducer.showSidebar
  );

  return (
    <section className="w-full p-3 sm:px-22 px-8 bg-green-600 text-white font-bold text-xl">
      <div className="flex justify-between place-items-center">
        <div onClick={openFilterBar} className="sm:hidden block" id="filters">
          {showFilters ? (
            <img src={closeIcon} alt="" />
          ) : (
            <img src={menuIcon} alt="" />
          )}
        </div>

        <div className="kumar-one-regular font-bold sm:text-2xl">
          <Link to={"/"}>Grays online store</Link>
        </div>

        <div className="flex place-items-center space-x-4">
          <Link to={"/checkout"}>
            <div className="bg-white hover:cursor-pointer rounded-full p-2 relative w-8 h-8 flex items-center justify-center shadow-md">
              <img
                src="/shopping_cart_26dp.svg"
                alt="Cart"
                className="w-6 h-6"
              />

              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>

          <div id="profile" className="">
            <img src={profileIcon} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

interface HeaderPropTypes {
  openFilterBar?: () => void;
  openFilter?: boolean;
}
