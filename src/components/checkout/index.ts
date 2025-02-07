import { ReactNode } from "react";
import Checkout from "./Checkout";
import Payments from "./Payments";

export { Checkout, Payments };

export interface IPaymentType {
  close: () => void;
  open: boolean;
}

export interface ModalProps {
  open: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
  className: string;
}
