import OrderCard from "./OrderCard";
import { formatDate } from "@/utils/dateFormatter";
import { useFetchOrdersQuery } from "@/state/features/orders/orderApi";

const Orders = () => {
  const { data: OrderList } = useFetchOrdersQuery("");

  console.log(OrderList, "OrderList");
  return (
    <div className="base-w pb-4">
      <h2 className="sm:text-center text-2xl py-5">My Orders</h2>

      <div className="space-y-2 ">
        {OrderList?.map((order, index) => (
          <section
            key={index}
            className="border border-gray-500 rounded shadow-md p-3"
          >
            <p className="text-black font-light">
              Receipt number:{" "}
              <span className="order-span">
                {order.transaction.receipt_number}
              </span>
            </p>
            <p className="text-black font-light">
              Phone Number:{" "}
              <span className="order-span">
                {order.transaction.phone_number}
              </span>
            </p>
            <p className="text-black font-light">
              Transaction Amount:{" "}
              <span className="order-span">{order.transaction.amount}</span>
            </p>
            <p className="text-black font-light">
              Date of transaction :{" "}
              <span className="order-span">
                {formatDate(order.date_created)}
              </span>
            </p>
            <OrderCard order={order.order_items} />
          </section>
        ))}
      </div>
    </div>
  );
};
export default Orders;
