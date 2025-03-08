import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Orders } from "@/__pages/orders";
import { Checkout } from "@/components/checkout";
import { AuthenticatedView, AuthLayout, MainLayout } from "@/__layouts";

import { lazy, Suspense } from "react";
import { AddProduct } from "@/components/catalogue";

const NotFound404 = lazy(() => import("@/__pages/NotFound404"));
const Catalogue = lazy(() => import("@/__pages/Catalogue"));
const ProductDetail = lazy(() => import("@/__pages/ProductDetail"));
const SignInForm = lazy(() => import("@/__pages/auth/SignInForm"));
const SignUpForm = lazy(() => import("@/__pages/auth/SignUpForm"));

const Routing = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen w-full animate-pulse">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Catalogue />} />
            <Route path="/details/:id" element={<ProductDetail />} />
          </Route>

          <Route element={<AuthenticatedView />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/add" element={<AddProduct />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default Routing;
