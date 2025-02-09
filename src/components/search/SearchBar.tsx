import { useState } from "react";
import { Button, Input } from "../inputs";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(() => e.target.value);
  };

  const handleSubmit = () => {
    return searchText;
  };

  return (
    <section className="ring-1 flex rounded-md w-2/3">
      <Input
        placeholder="Search for products or categories"
        id="search"
        name="search"
        className=" border-none ring-0 w-2/3"
        onChange={handleSearch}
        type="text"
      />

      <Button
        className="text-white dark-purple p-2 w-1/3 rounded-r-md"
        onClick={handleSubmit}
        submitBtn={true}
      >
        Search
      </Button>
    </section>
  );
};
export default SearchBar;
