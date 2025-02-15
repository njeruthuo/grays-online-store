import { useFetchCategoryListQuery } from "@/state/features/products/productApi";
import { filterCategories } from "@/state/features/products/productSlice";
import { ICategories } from "@/types/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "../inputs";

const CategoryFilter = () => {
    const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<ICategories[]>(
    []
  );
  function onSelectCategory(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target; // Use checked instead of value

    setSelectedCategories((prev) => {
      if (checked) {
        const category = CategoriesList?.find((cat) => cat.name === name);
        if (!category) return prev;

        return [...prev, category];
      } else {
        return prev.filter((category) => category.name !== name);
      }
    });
  }

  function checkActiveBoxes(item: ICategories) {
    return selectedCategories?.some((category) => category.name == item.name);
  }

  const { data: CategoriesList } = useFetchCategoryListQuery(null);

  useEffect(() => {
    dispatch(filterCategories(selectedCategories));
  }, [selectedCategories, dispatch]);

  return (
    <>
      {CategoriesList?.map((item, index) => (
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
    </>
  );
};
export default CategoryFilter;
