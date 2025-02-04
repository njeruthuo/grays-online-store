import { IPaymentType } from ".";
import { GlobalModal } from "../modal";

const Payments: React.FC<IPaymentType> = ({ open, close }) => {
  if (!open) return null;
  return (
    <GlobalModal close={close} open={open} title="Payment">
      <p>Here goes nothing</p>
    </GlobalModal>
  );
};
export default Payments;
