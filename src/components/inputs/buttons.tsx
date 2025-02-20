import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export const MyButton: React.FC<ButtonType> = ({
  children,
  className,
  onClickHandler,
  type,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      type={type == "submit" ? "submit" : "button"}
      onClick={onClickHandler}
      className={`${className} py-4 hover:cursor-pointer`}
    >
      {children}
    </Button>
  );
};

interface ButtonType {
  type: string;
  disabled?: boolean;
  children: ReactNode;
  className: string;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}
