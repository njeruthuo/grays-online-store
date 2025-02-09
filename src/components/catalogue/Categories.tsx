import { useFetchCategoryListQuery } from "@/state/features/products/productApi";
import { Checkbox } from "../inputs";
import { useState } from "react";
import { ICategories } from "@/types/products";

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState<ICategories[]>(
    []
  );
  const { data: CategoriesList } = useFetchCategoryListQuery(null);

  function onSelectCategory(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target; // Use checked instead of value

    setSelectedCategories((prev) => {
      if (checked) {
        // Add to array
        return [...prev, { name }];
      } else {
        // Remove from array
        return prev.filter((category) => category.name !== name);
      }
    });
  }

  function checkActiveBoxes(item: ICategories) {
    return selectedCategories?.some((category) => category.name == item.name);
  }

  console.log(CategoriesList, "c");
  return (
    <>
      <div className="card-color">
        <div>
          <div className="category-header">SHOP BY</div>
          <div className="category-container">
            <div>
              <h2 className="font-bold">Category</h2>
              <div>
                {CategoriesList?.map((item) => (
                  <section className="flex space-x-3">
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
              </div>
            </div>

            <div>
              <h2>Price</h2>
              <div>{/* Category list here */}</div>
            </div>

            <div>
              <h2>Manufacturer</h2>
              <div>{/* Category list here */}</div>
            </div>

            {/* <div>
              <h2>Color</h2>
              <div></div>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="card-color mt-6">
        <div>
          <div className="category-header">BEST SELLERS</div>
          <div className="category-container">
            <p>A list of most sold products.</p>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Categories;
