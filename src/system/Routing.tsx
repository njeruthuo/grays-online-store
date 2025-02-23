import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Orders } from "@/__pages/orders";
import NotFound404 from "@/__pages/NotFound404";
import { Checkout } from "@/components/checkout";
import { Catalogue, ProductDetail } from "@/__pages";
import { SignInForm, SignUpForm } from "@/__pages/auth";
import { AuthenticatedView, AuthLayout, MainLayout } from "@/__layouts";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Catalogue />} />
          <Route path="/details/:id" element={<ProductDetail />} />
        </Route>

        <Route element={<AuthenticatedView />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
