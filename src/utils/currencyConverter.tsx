import { useContext, useMemo } from "react";
import { formatNumber } from "./numberFormatter";
import { CurrencyContext } from "@/state/context/CurrencyContext";

const CurrencyConverter = ({ priceInUSD }: { priceInUSD: number }) => {
  const { localCurrency, exchangeRates } = useContext(CurrencyContext);

  // Calculate converted price only when needed
  const convertedPrice = useMemo(() => {
    const rate = exchangeRates[localCurrency] || 1; // Default to 1 if missing
    return parseFloat((priceInUSD * rate).toFixed(2));
  }, [priceInUSD, localCurrency, exchangeRates]);

  return (
    <span className="font-bold">
      {localCurrency} {formatNumber(convertedPrice)}
    </span>
  );
};

export default CurrencyConverter;
