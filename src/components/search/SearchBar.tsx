import { LoaderCircleIcon } from "lucide-react";

import { Button, Input } from "../inputs";

const SearchBar = ({
  setSearchText,
  isFetching,
}: {
  setSearchText: (arg: string) => void;
  isFetching: boolean;
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = () => {
    // setSearch(true);
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
        className="text-white dark-purple p-2 sm:w-1/3 rounded-r-md flex place-items-center justify-center space-x-4"
        onClick={handleSubmit}
        submitBtn={true}
      >
        <span>Search</span>
        {isFetching && <LoaderCircleIcon className="animate-spin" />}
      </Button>
    </section>
  );
};
export default SearchBar;
