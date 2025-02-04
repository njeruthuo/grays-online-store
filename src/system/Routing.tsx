import { MainLayout } from "@/__layouts";
import { Catalogue, ProductDetail } from "@/__pages";
import { Checkout } from "@/components/checkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Catalogue />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
