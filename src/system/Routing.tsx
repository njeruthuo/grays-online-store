import { MainLayout } from "@/__layouts";
import { Catalogue, ProductDetail } from "@/__pages";
import NotFound404 from "@/__pages/NotFound404";
import { Checkout } from "@/components/checkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Catalogue />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
