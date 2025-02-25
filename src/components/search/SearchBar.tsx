import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Input } from "../inputs";
import { filterSearchBar } from "@/state/features/products/productSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(() => e.target.value);
  };

  const handleSubmit = () => {
    dispatch(filterSearchBar(searchText));
  };

  return (
    <section className="ring-1 flex rounded-md sm:w-2/3">
      <Input
        placeholder="Search for products or categories"
        id="search"
        name="search"
        className=" border-none ring-0 sm:w-2/3 px-4"
        onChange={handleSearch}
        type="text"
      />

      <Button
        className="text-white dark-purple p-2 sm:w-1/3 rounded-r-md"
        onClick={handleSubmit}
        submitBtn={true}
      >
        Search
      </Button>
    </section>
  );
};
export default SearchBar;
