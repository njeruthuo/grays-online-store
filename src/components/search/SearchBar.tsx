// import { LoaderCircleIcon } from "lucide-react";

import { Button, Input } from "../inputs";
import { useDispatch } from "react-redux";
import { filterSearchBar } from "@/state/features/products/productSlice";
// import { useState } from "react";

const SearchBar = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (value: string) => void;
}) => {

  const dispatch = useDispatch();

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        type="text"
      />

      <Button
        className="text-white dark-purple p-2 sm:w-1/3 rounded-r-md flex place-items-center justify-center space-x-4"
        onClick={handleSubmit}
        submitBtn={true}
      >
        <span>Search</span>
        {/* {isFetching && <LoaderCircleIcon className="animate-spin" />} */}
      </Button>
    </section>
  );
};
export default SearchBar;
