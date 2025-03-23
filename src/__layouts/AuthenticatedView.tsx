import { Header, PaymentInfo } from "@/components/navigation";
import { isLoggedIn } from "@/state/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedView = () => {
  const isAuthenticated = useSelector(isLoggedIn);
  return (
    <div className="relative">
      <Header />
      {!isAuthenticated ? (
        <Navigate to={"/sign-in?next=/checkout"} />
      ) : (
        <Outlet />
      )}
      <PaymentInfo/>
    </div>
  );
};
export default AuthenticatedView;
