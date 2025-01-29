import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section className=" min-h-screen base-color">
      <Outlet />
    </section>
  );
};
export default MainLayout;
