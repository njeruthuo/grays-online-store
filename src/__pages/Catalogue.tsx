import { Categories, ProductList } from "@/components/catalogue";

const Catalogue = () => {
  return (
    <section className="flex space-x-6 w-[90%] mx-auto pt-8">
      <div className="hidden sm:block w-1/6">
        <div>
          <Categories />
        </div>
      </div>
      <div className="w-full  sm:w-5/6">
        <div>
          <ProductList />
        </div>
      </div>
    </section>
  );
};
export default Catalogue;
