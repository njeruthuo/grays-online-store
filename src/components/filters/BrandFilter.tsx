import { ICategories, IProduct } from "@/types/products";
import { useEffect, useState } from "react";
import { Checkbox } from "../inputs";
import { useDispatch } from "react-redux";
import { filterBrand } from "@/state/features/products/productSlice";

const BrandFilter = ({ products }: { products: IProduct[] }) => {
  const dispatch = useDispatch();
  const [brandList, setBrandList] = useState<ICategories[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<ICategories[]>([]);

  useEffect(() => {
    setBrandList(() => {
      const listItems: ICategories[] = [];
      products.forEach((product) => listItems.push(product.brand));
      return listItems;
    });
  }, [products]);

  function onSelectBrand(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target; // Use checked instead of value

    setSelectedBrand((prev) => {
      if (checked) {
        const brand = brandList?.find((cat) => cat.name === name);
        if (!brand) return prev;

        return [...prev, brand];
      } else {
        return prev.filter((brand) => brand.name !== name);
      }
    });
  }

  useEffect(() => {
    dispatch(filterBrand(selectedBrand));
  }, [selectedBrand, dispatch]);

  function checkActiveBoxes(item: ICategories) {
    return selectedBrand?.some((brand) => brand.name == item.name);
  }

  return (
    <div>
      {brandList?.map((brand, index) => (
        <section key={index} className="flex space-x-3">
          <Checkbox
            className=""
            id={brand.name}
            name={brand.name}
            onChange={onSelectBrand}
            checked={checkActiveBoxes(brand)}
          />
          <p className="dark-purple-text" key={brand.id}>
            {brand.name}
          </p>
        </section>
      ))}
      {/* {brandList?.map((brand) => ( */}
      {/* // <p>{brand.name}</p>
        {brand?.map((item, index) => (
                  <section key={index} className="flex space-x-3">
                    <Checkbox
                      id={item.name}
                      name={item.name}
                      checked={checkActiveBoxes(item)}
                      className=""
                      onChange={onSelectCategory}
                    />
                    <p className="dark-purple-text" key={item.id}>
                      {item.name}
                    </p>
                  </section>
                ))}
      // ))} */}
    </div>
  );
};
export default BrandFilter;
