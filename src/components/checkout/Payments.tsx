import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { IPaymentType } from ".";
// import { Spinner } from "../spinner";
import { GlobalModal } from "../modal";
import { Button } from "../inputs";
import { formatNumber } from "@/utils/numberFormatter";
import { BASE_WEBSOCKET_URL } from "@/constants/constant";
import { cartItemsList } from "@/state/features/products/productSlice";
import { useCheckoutMutation } from "@/state/features/checkout/checkoutApi";
import { toasty } from "../toaster";
import { Spinner } from "../spinner";

const Payments: React.FC<IPaymentType> = ({
  open,
  close,
  setTransactionSuccessful,
}) => {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const [mpesaResponse, setMpesaResponse] = useState({ data: [] });
  // const [transactionComplete, setTransactionComplete] = useState<boolean>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState("");

  const transactionSuccessful: boolean = mpesaResponse?.data?.some(
    (item: { Name: string }) => item.Name === "MpesaReceiptNumber"
  );

  useEffect(() => {
    if (transactionSuccessful) {
      setTransactionSuccessful(transactionSuccessful);
    }
  }, [transactionSuccessful, setTransactionSuccessful, close]);

  const loading = useMemo(
    () => isLoading || isProcessing,
    [isProcessing, isLoading]
  );

  const cartItems = useSelector(cartItemsList);

  const totals = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  const checkoutHandler = async () => {
    try {
      setIsProcessing(true);
      const response = await checkout({ phone, totals, cartItems }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      toasty("Request failed!!", "error");
    }
  };

  useEffect(() => {
    let socket = new WebSocket(BASE_WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket Connected!");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mpesa notification", data);
      // setTransactionComplete(true);
      setMpesaResponse(data);
      setIsProcessing(false);
    };

    socket.onclose = () => {
      console.log("WebSocket closed, reconnecting...");
      setTimeout(() => {
        socket = new WebSocket(BASE_WEBSOCKET_URL);
      }, 3000);
    };

    return () => {
      socket.close(); // Close WebSocket on unmount
    };
  }, []);

  if (!open) return null;

  return (
    <GlobalModal
      close={close}
      open={open}
      title="Payments"
      className="dark-purple-text"
    >
      <section className="">
        <h1 className="font-bold text-lg">Pay for the following items</h1>

        <div className="my-3 font-bold">
          <div className="flex justify-between">
            <h2>Product name</h2>
            <h2>Qty</h2>
            <h2>Total price</h2>
          </div>
        </div>

        {cartItems.map((item, index) => (
          <section key={index}>
            <div className="flex justify-between">
              <h2>{item.product.name}</h2>
              <h2>{item.quantity}</h2>
              <h2>
                {formatNumber(item.quantity * Number(item.product.price))}
              </h2>
            </div>
          </section>
        ))}

        <div id="totals" className="my-3 mb-6">
          <div className="flex justify-end font-bold">
            <h2>
              Totals: <span>{formatNumber(totals)}</span>
            </h2>
          </div>
        </div>

        <div id="pay" className="flex justify-between mt-3 space-x-2 text-sm">
          <input
            placeholder="Phone number"
            className="placeholder-blue-500 p-2 ring-1 rounded"
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

              if (!input.startsWith("254")) {
                input = "254" + input.replace(/^254/, ""); // Ensure it starts with 254
              }

              setPhone(input);
            }}
          />

          <Button
            submitBtn={true}
            onClick={checkoutHandler}
            className={`ring ring-blue-500 text-white rounded bg-blue-500`}
          >
            <div
              className={`flex justify-center items-center space-x-2 sm:w-full px-2 ${
                loading ? "" : ""
              }`}
            >
              {loading && <Spinner />}
              <span>Request payment</span>
            </div>
          </Button>
        </div>
      </section>
    </GlobalModal>
  );
};
export default Payments;
