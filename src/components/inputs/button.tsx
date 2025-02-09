import { ReactNode } from "react";

const Button: React.FC<ButtonType> = ({
  children,
  className,
  submitBtn,
  onClick,
}) => {
  return (
    <button
      className={`${className} hover:cursor-pointer`}
      onClick={onClick}
      type={submitBtn ? "submit" : "button"}
    >
      {children}
    </button>
  );
};
export default Button;

interface ButtonType {
  children: ReactNode;
  className: string;
  submitBtn: boolean;
  onClick: () => void;
}
