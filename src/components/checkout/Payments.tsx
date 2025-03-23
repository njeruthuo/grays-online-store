import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { IPaymentType } from ".";
import { GlobalModal } from "../modal";
import { Button } from "../inputs";
import { formatNumber } from "@/utils/numberFormatter";
import { BASE_WEBSOCKET_URL } from "@/constants/constant";
import { cartItemsList } from "@/state/features/products/productSlice";
import { useCheckoutMutation } from "@/state/features/checkout/checkoutApi";
import { toasty } from "../toaster";
import { Spinner } from "../spinner";
import CopyTillNumber from "@/utils/CopyTillNumber";
import CurrencyConverter from "@/utils/currencyConverter";

const Payments: React.FC<IPaymentType> = ({
  open,
  close,
  setTransactionSuccessful,
  items,
}) => {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const [mpesaResponse, setMpesaResponse] = useState({ data: [] });
  const [lipaMdogo, setLipaMdogo] = useState(false);
  const [mdogoAmount, setMdogoAmount] = useState("");
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

  const total_sum = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  function payloadFormulator() {
    const totals = lipaMdogo ? mdogoAmount : total_sum;
    if (items?.id) {
      return {
        order_id: items.id,
        phone,
        totals: Number(items.outstanding_balance),
        cartItems: items.order_items,
        lipaMdogo,
        mdogoAmount: Number(totals),
      };
    } else {
      return {
        phone,
        totals: total_sum,
        cartItems,
        lipaMdogo,
        mdogoAmount: Number(totals),
      };
    }
  }

  const checkoutHandler = async () => {
    try {
      setIsProcessing(true);
      if (lipaMdogo && mdogoAmount.length == 0) {
        toasty(
          "Please input your preferred lipa mdogo mdogo amount",
          "warning"
        );
        setIsProcessing(false);
        return;
      }

      const response = await checkout(payloadFormulator()).unwrap();
      toasty("Payment request sent!", "success");
      console.log(response);
      return;
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
      {items?.id ? (
        <section className="">
          <h1 className="font-bold text-lg">
            Continue paying for the following order
          </h1>

          <div className="my-3 font-bold">
            <div className="flex justify-between">
              <h2>Product name</h2>
              <h2>Qty</h2>
              <h2>Total price</h2>
            </div>
          </div>

          {items.order_items.map((item, index) => (
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
                Remaining balance:{" "}
                <span>{formatNumber(items.outstanding_balance)}</span>
              </h2>
            </div>
          </div>

          <div className="flex place-items-center space-x-2 ">
            {lipaMdogo && (
              <div id="amount" className="border">
                <input
                  className="placeholder-blue-500 w-[190px] p-1 ring-1 rounded"
                  type="text"
                  name="amount"
                  id=""
                  value={mdogoAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMdogoAmount(e.target.value)
                  }
                  placeholder="Enter amount to pay"
                />
              </div>
            )}
            <div className="flex space-x-2 place-items-center">
              <input
                type="checkbox"
                name="lipaModogo"
                id=""
                checked={lipaMdogo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLipaMdogo(e.target.checked)
                }
              />
              <h2 className="text-xs">Lipa mdogo mdogo</h2>
            </div>
          </div>

          <div id="pay" className="flex justify-between mt-3 space-x-2 text-sm">
            <input
              placeholder="e.g 254768585724"
              className="placeholder-blue-500 p-2 ring-1 rounded"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />

            <span className="text-red-500">Hey</span>

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
      ) : (
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
                  <CurrencyConverter
                    priceInUSD={Number(
                      formatNumber(item.quantity * Number(item.product.price))
                    )}
                  />
                </h2>
              </div>
            </section>
          ))}

          <div id="totals" className="my-3 mb-6">
            <div className="flex justify-end font-bold">
              <h2>
                Totals:
                <CurrencyConverter priceInUSD={Number(total_sum)} />
              </h2>
            </div>
          </div>

          <div>
            <h3>Make a payment through Mpesa Till number </h3>
            <CopyTillNumber />
          </div>

          {/* <div className="flex place-items-center space-x-2 ">
            {lipaMdogo && (
              <div id="amount" className="border">
                <input
                  className="placeholder-blue-500 w-[190px] p-1 ring-1 rounded"
                  type="text"
                  name="amount"
                  id=""
                  value={mdogoAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMdogoAmount(e.target.value)
                  }
                  placeholder="Enter amount to pay"
                />
              </div>
            )}
            <div className="flex space-x-2 place-items-center">
              <input
                type="checkbox"
                name="lipaModogo"
                id=""
                checked={lipaMdogo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLipaMdogo(e.target.checked)
                }
              />
              <h2 className="text-xs">Lipa mdogo mdogo</h2>
            </div>
          </div>

          <div
            id="pay"
            className="flex flex-col justify-between sm:flex-row sm:items-center mt-3 space-y-3 sm:space-y-0 sm:space-x-2 text-sm"
          >
            <div className="flex flex-col w-full sm:w-auto">
              <input
                placeholder="e.g 254768585724"
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <span className="text-red-500 text-xs mt-1">
                * Ensure your phone number starts with 254 *
              </span>
            </div>

            <Button
              submitBtn={true}
              onClick={checkoutHandler}
              className="px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 transition-all rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <div className="flex justify-center items-center space-x-2">
                {loading && <Spinner />}
                <span>Request payment</span>
              </div>
            </Button>
          </div> */}
        </section>
      )}
    </GlobalModal>
  );
};
export default Payments;
