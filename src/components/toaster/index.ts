import { toast } from "react-toastify";

export const toasty = (
  message: string,
  type: "success" | "warning" | "error"
) => {
  if (type == "error") return toast.error(message);
  if (type == "warning") return toast.warning(message);
  if (type == "success") return toast.success(message);
};
