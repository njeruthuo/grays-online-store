import { isLoggedIn } from "@/state/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const AuthLayout = () => {
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") || "/";

  const isAuthenticated = useSelector(isLoggedIn);

  return (
    <div className="bg-[#DDC8C4] w-full h-screen flex justify-center items-center">
      {isAuthenticated ? (
        <Navigate to={next} />
      ) : (
        <div className=" w-1/3 mx-auto rounded-md border p-8 shadow-lg">
          <Outlet />
        </div>
      )}
    </div>
  );
};
export default AuthLayout;
