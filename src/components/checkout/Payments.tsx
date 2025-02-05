import { IPaymentType } from ".";
import { GlobalModal } from "../modal";

const Payments: React.FC<IPaymentType> = ({ open, close }) => {
  let socket = new WebSocket("ws://127.0.0.1:8001/ws/payments/");

  socket.onopen = function () {
    console.log("WebSocket connected");
  };

  socket.onmessage = function (event) {
    const paymentData = JSON.parse(event.data);
    console.log("Payment Confirmation Received:", paymentData);
  };

  socket.onerror = function (error) {
    console.error("WebSocket Error:", error);
  };

  socket.onclose = function () {
    console.log("WebSocket closed, reconnecting...");
    setTimeout(() => {
      reconnectWebSocket();
    }, 3000); // Reconnect after 3 seconds
  };

  // Function to reconnect WebSocket
  function reconnectWebSocket() {
    if (socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket("ws://127.0.0.1:8001/ws/payments/");
    }
  }

  if (!open) return null;
  return (
    <GlobalModal close={close} open={open} title="Payment">
      <p>Here goes nothing</p>
    </GlobalModal>
  );
};
export default Payments;
