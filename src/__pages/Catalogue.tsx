import { Categories, ProductList } from "@/components/catalogue";
import { RootState } from "@/state/store/store";
import { useSelector } from "react-redux";

const Catalogue = () => {
  const showFilters = useSelector(
    (state: RootState) => state.themeReducer.showSidebar
  );

  console.log(showFilters, "showFilters");

  const categoriesStyles = `${
    showFilters ? "absolute fixed z-50" : "hidden sm:block w-1/6"
  }`;

  return (
    <section className="flex relative sm:space-x-6 sm:w-[90%] w-[95%] mx-auto pt-8">
      <div className={categoriesStyles}>
        <div>
          <Categories />
        </div>
      </div>
      <div className="w-full sm:w-5/6">
        <div>
          <ProductList />
        </div>
      </div>
    </section>
  );
};
export default Catalogue;
