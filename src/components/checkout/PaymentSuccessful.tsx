import success from "@/assets/wavy.jpg";
import { MyButton } from "../inputs";
import { useNavigate } from "react-router-dom";
import { GlobalModal } from "../modal";
import { messageImageStyles } from ".";
import { useDispatch } from "react-redux";
import { clearCartItems } from "@/state/features/products/productSlice";

const PaymentSuccessful = ({
  close,
  open,
}: {
  close: () => void;
  open: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccessfulCheckout = () => {
    // Remove the cart items
    dispatch(clearCartItems());

    // Navigate to Orders page
    navigate("/orders");
  };

  return (
    <GlobalModal
      close={close}
      open={open}
      title="Checkout successful!"
      className="dark-purple-text"
    >
      <div>
        <img src={success} alt="" className={`${messageImageStyles} `} />
        <p className="text-center font-bold">
          Your payment was successful. Check your order.
        </p>

        <MyButton
          className="my-4 w-full bg-blue-500 hover:bg-blue-400"
          type="button"
          onClickHandler={handleSuccessfulCheckout}
        >
          My Orders
        </MyButton>
      </div>
    </GlobalModal>
  );
};
export default PaymentSuccessful;
