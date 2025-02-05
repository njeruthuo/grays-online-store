import { IPaymentType } from ".";
import { GlobalModal } from "../modal";

const Payments: React.FC<IPaymentType> = ({ open, close }) => {
  let socket = new WebSocket("ws://127.0.0.1:8001/ws/mpesa/");

  socket.onopen = () => {
    console.log("WebSocket Connected!");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("MPESA Response:", data);
    alert(`Payment Status: ${data.ResponseDescription}`);
  };

  function requestSTKPush(phone, amount, orderId) {
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
      socket = new WebSocket("ws://127.0.0.1:8001/ws/mpesa/");
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
