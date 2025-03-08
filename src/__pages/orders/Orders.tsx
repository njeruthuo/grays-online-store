import OrderCard from "./OrderCard";
import { formatDate } from "@/utils/dateFormatter";
import { useFetchOrdersQuery } from "@/state/features/orders/orderApi";
import { LoaderPinwheelIcon } from "lucide-react";
import { MyButton } from "@/components/inputs";
import { useState } from "react";
import { Payments } from "@/components/checkout";
import { OrderInterface } from "@/state/features/orders";

const Orders = () => {
  const { data: OrderList, isLoading } = useFetchOrdersQuery("");
  const [itemToPay, setItemsToPay] = useState<OrderInterface>();

  function openPaymentModal(items: OrderInterface) {
    setOpenPayments((prev) => !prev);
    setItemsToPay(items);
  }

  function transactionSuccessful() {}

  const [openPayment, setOpenPayments] = useState(false);

  return (
    <div className="base-w pb-4">
      <h2 className="sm:text-center text-2xl py-5">My Orders</h2>

      {isLoading ? (
        <section className="h-[calc(100vh-10rem)] flex justify-center items-center">
          <LoaderPinwheelIcon className="animate-spin" />
        </section>
      ) : (
        <div className="space-y-2 ">
          {OrderList?.map((order, index) => (
            <section
              key={index}
              className="border text-black  border-gray-500 rounded shadow-md p-3"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold ">Order Details</h3>
                  <div className="my-2">
                    <h5 className="text-sm ">
                      <span>Created on: </span>
                      <span className="mr-4">
                        {new Date(order.date_created).toLocaleString()}
                      </span>
                    </h5>

                    {order.lipa_mdogo && (
                      <div className="space-y-2 mt-2">
                        <h5 className="text-sm flex place-items-center space-x-2 items-center">
                          <span className="">
                            <input
                              type="checkbox"
                              name=""
                              checked={order.lipa_mdogo}
                              id=""
                            />
                          </span>
                          <span>Lipa mdogo: </span>
                        </h5>

                        <h5 className="text-sm flex place-items-center space-x-2 items-center">
                          <span className="">
                            <input
                              type="checkbox"
                              name=""
                              checked={order.payment_completed}
                              id=""
                            />
                          </span>
                          <span>Payment completed: </span>
                        </h5>

                        <h5 className="text-sm flex place-items-center space-x-2 items-center">
                          <span>Outstanding balance: </span>{" "}
                          <span>{order.outstanding_balance}</span>
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
                {order.lipa_mdogo && !order.payment_completed && (
                  <MyButton
                    className=""
                    onClickHandler={() => openPaymentModal(order)}
                    type="button"
                    disabled={false}
                  >
                    Complete payment
                  </MyButton>
                )}
              </div>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {order.payments.map((payment, index) => (
                  <section key={payment.id} className="">
                    <h2 className="text-blue-500">Payment #{index + 1}</h2>
                    <p className="font-light">
                      Receipt number:{" "}
                      <span className="order-span">
                        <span>{payment.transaction.receipt_number}</span>;
                      </span>
                    </p>
                    <p className="text-black font-light">
                      Phone Number:{" "}
                      <span className="order-span">
                        {payment.transaction.phone_number}
                      </span>
                    </p>
                    <p className="text-black font-light">
                      Transaction Amount:{" "}
                      <span className="order-span">
                        {payment.transaction.amount}
                      </span>
                    </p>
                    <p className="text-black font-light">
                      Date of transaction :{" "}
                      <span className="order-span">
                        {formatDate(order.date_created)}
                      </span>
                    </p>
                  </section>
                ))}
              </div>

              {order.order_items.length > 0 && (
                <OrderCard order={order.order_items} />
              )}
            </section>
          ))}
        </div>
      )}

      {openPayment && (
        <Payments
          close={() => setOpenPayments((prev) => !prev)}
          open={openPayment}
          setTransactionSuccessful={transactionSuccessful}
          items={itemToPay}
        />
      )}
    </div>
  );
};
export default Orders;
