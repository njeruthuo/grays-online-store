import { Header } from "@/components/navigation";
import { isLoggedIn } from "@/state/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedView = () => {
  const isAuthenticated = useSelector(isLoggedIn);
  return (
    <div>
      <Header />
      {!isAuthenticated ? (
        <Navigate to={"/sign-in?next=/checkout"} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
export default AuthenticatedView;
