import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, TrashIcon } from "lucide-react";

import Payments from "./Payments";
import { AlreadyCarted } from "../cart";
import { formatNumber } from "@/utils/numberFormatter";

import PaymentFailed from "./PaymentFailed";
import PaymentSuccessful from "./PaymentSuccessful";
import {
  cartItemsList,
  removeFromCart,
} from "@/state/features/products/productSlice";

const Checkout = () => {
  const dispatch = useDispatch();

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

  console.log(transactionSuccessful, "transactionSuccessful");

  const totals = cart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <section className="py-4">
      <Link to={"/"}>
        <div className="flex m-3">
          <img className="text-black" src="/chevron_left_26dp.svg" alt="" />{" "}
          <span>Back to shop</span>
        </div>
      </Link>

      <section id="selected-products">
        {/* Show a list of items in cart or a default message */}
        {cart?.length > 0 ? (
          <section className="w-[90%] mt-4 mx-auto ">
            <h2 className="text-center text-2xl font-bold my-4">My cart</h2>
            <div className="rounded-lg bg-white ">
              {cart?.map((item, index) => (
                <div
                  className={`flex space-x-4 ${
                    cart.length - 1 > index
                      ? "border-b pb-2 border-gray-500"
                      : ""
                  }`}
                  key={index}
                >
                  <div className="flex-1">
                    <img
                      alt={item.product.name}
                      className="h-auto w-44"
                      src={`${item.product.images[0]}`}
                    />
                  </div>

                  <div id="details" className="flex flex-1 space-y-2 flex-col">
                    <p className="text-2xl font-bold">{item.product.name}</p>
                    <p className="font-bold">{item.product.category.name}</p>
                    <p className="text-md">
                      Kshs. {formatNumber(item.product.price)}
                    </p>{" "}
                    <span>Qty: {item.quantity}</span>
                    <p>
                      <span>Total price: Kshs. </span>{" "}
                      <span>
                        {formatNumber(
                          Number(item.product.price) * item.quantity
                        )}
                      </span>
                    </p>
                  </div>

                  <div
                    id="quantity-control"
                    className="flex-1 flex justify-center space-x-4 items-center mx-4"
                  >
                    <AlreadyCarted
                      product={item.product}
                      quantity={item.quantity}
                    />

                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="flex px-2 py-2 text-white bg-red-500 rounded hover:cursor-pointer"
                    >
                      <span>Remove</span> <TrashIcon />
                    </button>
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
            <span>Cumulative totals: Kshs. </span>
            <span className="text-blue-500 text-xl underline mx-4">
              {formatNumber(totals)}
            </span>
          </p>

          <button
            onClick={togglePayment}
            className="ml-auto flex hover:cursor-pointer text-white font-bold px-4 py-3 rounded-md bg-green-500"
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
