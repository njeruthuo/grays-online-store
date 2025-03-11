import { MyButton } from "../inputs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/state/store/store";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const Pagination = ({ onChange }: { onChange: (arg: number) => void }) => {
  const { next, count } = useSelector(
    (state: RootState) => state.productReducer
  );
  const [current, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    onChange(current);
  }, [current, onChange]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className=" flex justify-between p-2 rounded-lg">
      <MyButton
        className="bg-blue-500 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
        type="button"
        onClickHandler={handlePreviousPage}
        disabled={current === 1}
      >
        <ArrowBigLeft /> <span>Previous page</span>
      </MyButton>
      <span className="px-4 py-2">
        Page {`${current} / ${Math.floor(count / 10)}`}
      </span>
      <MyButton
        className="bg-green-500 hover:bg-green-400"
        type="button"
        onClickHandler={handleNextPage}
        disabled={!next}
      >
        <span>Next page</span> <ArrowBigRight />
      </MyButton>
    </div>
  );
};

export default Pagination;
