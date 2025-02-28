import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

import Payments from "./Payments";
import { AlreadyCarted } from "../cart";
import { formatNumber } from "@/utils/numberFormatter";

import PaymentFailed from "./PaymentFailed";
import PaymentSuccessful from "./PaymentSuccessful";
import {
  cartItemsList,
  // removeFromCart,
} from "@/state/features/products/productSlice";

const Checkout = () => {
  // const dispatch = useDispatch();

  const [transactionSuccessful, setTransactionSuccessful] = useState<boolean>();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  useEffect(() => {
    if (transactionSuccessful !== undefined) {
      if (transactionSuccessful) {
        setOpenSuccess(transactionSuccessful);
      } else {
        setOpenFailed(transactionSuccessful);
      }
    }
  }, [transactionSuccessful]);

  const cart = useSelector(cartItemsList);
  const [openPayment, setOpenPayment] = useState(false);

  const togglePayment = () => {
    setOpenPayment((prev: boolean) => !prev);
  };

  const totals = cart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <section className="py-4">
      <Link to={"/"}>
        <div className="flex m-3">
          <img className="text-black" src="/chevron_left_26dp.svg" alt="" />{" "}
          <span>Go Back</span>
        </div>
      </Link>

      <section id="selected-products">
        {/* Show a list of items in cart or a default message */}
        {cart?.length > 0 ? (
          <section className="base-w mt-4 ">
            <h2 className="text-center text-2xl font-bold my-4">My cart</h2>
            <div className="p-2 space-y-3 overflow-y-auto h-[500px] border-gray-400 border rounded">
              {cart?.map((item, index) => (
                <div
                  className={`flex flex-col sm:flex-row space-x-4 border rounded-md shadow bg-amber-100 p-2 ${
                    cart.length - 1 > index
                      ? "border-b sm:pb-2 border-gray-500"
                      : ""
                  }`}
                  key={index}
                >
                  <div className="sm:flex-1 w-full">
                    <img
                      alt={item.product.name}
                      className="sm:h-auto sm:w-44 w-full"
                      src={`${item.product.images[0]}`}
                    />
                  </div>

                  <div
                    id="details"
                    className="flex flex-1 sm:space-y-2 flex-col text-center"
                  >
                    <p className="text-2xl font-bold text-gray-700">
                      {item.product.name}
                    </p>
                    <p className="text-md text-blue-500">
                      Kshs. {formatNumber(item.product.price)}
                    </p>
                  </div>

                  <div
                    id="quantity-control"
                    className="flex-1 text-sm flex justify-center space-x-4 items-center sm:mx-4"
                  >
                    <AlreadyCarted
                      product={item.product}
                      quantity={item.quantity}
                    />

                    {/* <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="flex place-items-center px-2 py-2 text-white bg-red-500 rounded hover:cursor-pointer"
                    >
                      <span>Remove</span> <TrashIcon />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="w-full text-center">
            You have no items in the cart.{" "}
            <Link to={"/"} className="text-blue-500">
              Start shopping now!
            </Link>{" "}
          </div>
        )}
        <div></div>
      </section>
      {cart.length > 0 && (
        <section
          id="payments&totals"
          className="w-[90%] mx-auto flex place-items-center"
        >
          <p className="font-bold my-6">
            <span>Totals: Kshs. </span>
            <span className="text-blue-500 text-xl underline sm:mx-4">
              {formatNumber(totals)}
            </span>
          </p>

          <button
            onClick={togglePayment}
            className="ml-auto flex hover:cursor-pointer text-white font-bold sm:px-4 p-2 sm:py-3 rounded-md bg-green-500"
          >
            <span>Check out</span> <ChevronRight />
          </button>
        </section>
      )}

      {openPayment && (
        <Payments
          close={togglePayment}
          open={openPayment}
          setTransactionSuccessful={setTransactionSuccessful}
        />
      )}

      {transactionSuccessful ? (
        <PaymentSuccessful
          close={() => setOpenSuccess(false)}
          open={openSuccess}
        />
      ) : (
        <PaymentFailed close={() => setOpenFailed(false)} open={openFailed} />
        // <></>
      )}
    </section>
  );
};
export default Checkout;
