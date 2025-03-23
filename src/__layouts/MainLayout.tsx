import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header, PaymentInfo } from "@/components/navigation";
import { toggleShowCategories } from "@/state/features/ui/theme";

const MainLayout = () => {
  const dispatch = useDispatch();

  function toggleFilterShow() {
    dispatch(toggleShowCategories());
  }

  return (
    <section className="relative">
      <div className="fixed right-0 left-0 z-50 top-0">
        <Header openFilterBar={toggleFilterShow} />
      </div>
      <div className="pt-12">
        <Outlet />
      </div>
      <PaymentInfo />
    </section>
  );
};
export default MainLayout;
