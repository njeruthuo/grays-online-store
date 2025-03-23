import { currencyMapping } from "@/constants/constant";
import { useEffect, useState } from "react";
import { formatNumber } from "./numberFormatter";

const DEFAULT_CURRENCY = "KES"; // Default to Kenyan Shillings
const BASE_CURRENCY = "USD"; // Assume product prices are in USD

const CurrencyConverter = ({ priceInUSD }: { priceInUSD: number }) => {
  const [localCurrency, setLocalCurrency] = useState(DEFAULT_CURRENCY);
  const [convertedPrice, setConvertedPrice] = useState(priceInUSD);

  useEffect(() => {
    const detectCurrency = async () => {
      const userLang = navigator.language;
      console.log(userLang, "userLang");
      const userCountry = userLang.split("-")[1] || "KE";
      const targetCurrency = currencyMapping[userCountry] || DEFAULT_CURRENCY;

      setLocalCurrency(targetCurrency);

      if (localCurrency !== "KES") {
        try {
          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`
          );
          const data = await response.json();
          const rate =
            data.rates[targetCurrency] || data.rates[DEFAULT_CURRENCY] || 1;

          setConvertedPrice(parseFloat((priceInUSD * rate).toFixed(2)));
        } catch (error) {
          console.error("Error fetching exchange rate:", error);
        }
      }
    };

    detectCurrency();
  }, [priceInUSD, localCurrency]);

  return (
    <span className="font-bol">
      {localCurrency} {formatNumber(convertedPrice)}
    </span>
  );
};

export default CurrencyConverter;
