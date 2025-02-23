import { ReusableTable } from "@/components/grid";
import { OrderItemType } from "@/state/features/orders";
import { useMemo } from "react";

interface OrderCardProps {
  order: OrderItemType[];
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const rows = useMemo(() => {
    return order.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      available:item.product.stocked
    }));
  }, [order]);

  console.log(rows, "rows");
  return (
    <section className="border">
      <h3 className="text-center my-2 font-bold">Products Ordered</h3>
      {order.map((item) => {
        return (
          <div key={item.id}>
            <ReusableTable rows={rows} />
          </div>
        );
      })}
    </section>
  );
};
export default OrderCard;
