import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { filterPriceRange } from "@/state/features/products/productSlice";
import { formatNumber } from "@/utils/numberFormatter";

function Slider({ maxPrice }: { maxPrice: number }) {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  const minPrice = 0;
  // const maxPrice = maxPrice;

  useEffect(() => {
    setPriceRange((prev) => ({ ...prev, max: maxPrice }));
  }, [maxPrice]);

  useEffect(() => {
    dispatch(filterPriceRange(priceRange));
  }, [priceRange, dispatch]);

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), priceRange.min + 1);
    setPriceRange((prev) => ({ ...prev, max: newMax }));
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      {/* <h2 className="text-lg font-bold mb-3">Filter by Price</h2> */}

      <div className="relative">
        {/* Range Slider */}

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.max}
          onChange={handleMaxChange}
          className="absolute w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer range-thumb"
        />
      </div>

      {/* Price Labels */}
      <div className="flex justify-between mt-6 text-xs">
        <span className=" py-1 bg-gray-100 rounded">Kshs {priceRange.min}</span>
        <span className="py-1 bg-gray-100 rounded">
          Kshs {formatNumber(priceRange.max)}
        </span>
      </div>
    </div>
  );
}
export default Slider;
