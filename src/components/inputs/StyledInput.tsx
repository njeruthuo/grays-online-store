import React, { ReactNode, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import Input from "./input";

interface StyledInputProps extends React.ComponentProps<typeof Input> {
  children?: ReactNode;
  className: string;
  type: string;
}

const StyledInput = React.forwardRef<HTMLInputElement, StyledInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={type === "password" && showPassword ? "text" : type}
          className={`rounded-lg border hover:border-2 focus:border-none hover:border-gray-700 border-gray-300 p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    );
  }
);

StyledInput.displayName = "StyledInput";

export default StyledInput;
