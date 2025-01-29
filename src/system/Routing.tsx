import { MainLayout } from "@/__layouts";
import { Catalogue } from "@/__pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Catalogue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
