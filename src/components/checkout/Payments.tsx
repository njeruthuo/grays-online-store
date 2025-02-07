import { useState } from "react";
import { useSelector } from "react-redux";

import { IPaymentType } from ".";
import { GlobalModal } from "../modal";
import { Button, Input } from "../inputs";
import { formatNumber } from "@/utils/numberFormatter";
import { BASE_WEBSOCKET_URL } from "@/constants/constant";
import { cartItemsList } from "@/state/features/products/productSlice";

const Payments: React.FC<IPaymentType> = ({ open, close }) => {
  const [phone, setPhone] = useState("");
  let socket = new WebSocket(BASE_WEBSOCKET_URL);

  socket.onopen = () => {
    console.log("WebSocket Connected!");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("MPESA Response:", data);
    alert(`Payment Status: ${data.ResponseDescription}`);
  };

  function requestSTKPush(phone: string, amount: number, orderId: string) {
    socket.send(
      JSON.stringify({
        phone_number: phone,
        amount: amount,
        order_id: orderId,
      })
    );
  }

  socket.onclose = function () {
    console.log("WebSocket closed, reconnecting...");
    setTimeout(() => {
      reconnectWebSocket();
    }, 3000);
  };

  function reconnectWebSocket() {
    if (socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket(BASE_WEBSOCKET_URL);
    }
  }

  const cartItems = useSelector(cartItemsList);

  const totals = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  function handleSTKPushRequest() {
    requestSTKPush(phone, totals, phone);
  }

  if (!open) return null;
  return (
    <GlobalModal
      close={close}
      open={open}
      title="Payments"
      className="dark-purple-text"
    >
      <section>
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

        <div id="pay" className="flex justify-between mt-3">
          <Input
            placeholder="Phone number"
            className="placeholder-blue-500"
            type="text"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button
            submitBtn={true}
            onClick={handleSTKPushRequest}
            className="ring ring-blue-500 text-white px-2 rounded bg-blue-500"
            children=<span>Request payment</span>
          />
        </div>
      </section>
    </GlobalModal>
  );
};
export default Payments;
