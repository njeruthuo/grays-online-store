import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "@/components/navigation";
import { toggleShowCategories } from "@/state/features/ui/theme";

import whatsappIcon from "@/assets/whatsapp-512.webp";

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

      <div className="rounded-full fixed right-1 z-40 bottom-20">
        <a
          href="https://wa.me/+254741627205?text=Hello!%20I%20need%20help%20with%20your%20website."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-4 bottom-20 z-40"
        >
          <img
            src={whatsappIcon}
            className="rounded-full h-12"
            alt="WhatsApp Support"
          />
        </a>
      </div>
    </section>
  );
};
export default MainLayout;
