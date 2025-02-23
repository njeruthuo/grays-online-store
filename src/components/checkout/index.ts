import { ReactNode } from "react";
import Checkout from "./Checkout";
import Payments from "./Payments";
import PaymentSuccessful from "./PaymentSuccessful";
import PaymentFailed from "./PaymentFailed";

export { Checkout, Payments, PaymentFailed, PaymentSuccessful };

export interface IPaymentType {
  close: () => void;
  open: boolean;
  setTransactionSuccessful: (value: boolean) => void;
}

export interface ModalProps {
  open: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
  className: string;
}

export const messageImageStyles = `h-72 w-full`;
