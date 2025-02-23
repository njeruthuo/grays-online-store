import failure from "@/assets/failure .webp";
import { MyButton } from "../inputs";
import { GlobalModal } from "../modal";

const PaymentFailed = ({
  close,
  open,
}: {
  close: () => void;
  open: boolean;
}) => {
  return (
    <GlobalModal
      close={close}
      open={open}
      title="Checkout successful!"
      className="dark-purple-text"
    >
      <div>
        <img src={failure} alt="" />
        <p>Your payment request failed. Please try again!</p>

        <MyButton className="" type="button" onClickHandler={() => close()}>
          Checkout
        </MyButton>
      </div>
    </GlobalModal>
  );
};
export default PaymentFailed;
