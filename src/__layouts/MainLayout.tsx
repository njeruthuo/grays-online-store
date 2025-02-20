import { Outlet } from "react-router-dom";
import { Header } from "@/components/navigation";

const MainLayout = () => {
  return (
    <section className=" ">
      <Header />
      <div>
        <Outlet />
      </div>
    </section>
  );
};
export default MainLayout;
