import { isLoggedIn } from "@/state/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const AuthLayout = () => {
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") || "/";

  const isAuthenticated = useSelector(isLoggedIn);

  return (
    <div className="bg-slate-700 w-full h-screen flex justify-center items-center">
      {isAuthenticated ? (
        <Navigate to={next} />
      ) : (
        <section className="flex-col ">
          <h3 className="text-center kumar-one-regular mb-8 font-bold text-2xl text-white">
            Grays online store
          </h3>
          <div className="sm:w-full sm:mx-auto rounded-md border p-8 shadow-lg">
            <Outlet />
          </div>
        </section>
      )}
    </div>
  );
};
export default AuthLayout;
