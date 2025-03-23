import { useEffect, useState } from "react";
import { formatNumber } from "./numberFormatter";
import { currencyMapping } from "@/constants/constant";

const DEFAULT_CURRENCY = "KES"; // Default to Kenyan Shillings
const BASE_CURRENCY = "KES"; // Assume product prices are in USD
const CACHE_KEY = "exchange_rates"; // Key for localStorage
const CACHE_EXPIRATION_HOURS = 24; // Cache expiry time

const CurrencyConverter = ({ priceInUSD }: { priceInUSD: number }) => {
  const [localCurrency, setLocalCurrency] = useState(DEFAULT_CURRENCY);
  const [convertedPrice, setConvertedPrice] = useState(priceInUSD);

  useEffect(() => {
    const detectCurrency = async () => {
      let userCountry = "KE"; // Default to Kenya if unknown

      try {
        // Fetch user's country based on IP address
        const ipResponse = await fetch("https://ipapi.co/country/");
        const countryCode = await ipResponse.text();
        userCountry = countryCode.toUpperCase();
      } catch (error) {
        console.error("Error fetching country from IP:", error);
        // Fallback to navigator.language if IP detection fails
        const userLang = navigator.language;
        userCountry = userLang.split("-")[1]?.toUpperCase() || "KE";
      }

      const targetCurrency = currencyMapping[userCountry] || DEFAULT_CURRENCY;
      setLocalCurrency(targetCurrency);

      // Check for cached exchange rates
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, rates } = JSON.parse(cachedData);
        const cacheAge = (Date.now() - timestamp) / (1000 * 60 * 60); // Convert ms to hours

        if (cacheAge < CACHE_EXPIRATION_HOURS && rates[targetCurrency]) {
          setConvertedPrice(
            parseFloat((priceInUSD * rates[targetCurrency]).toFixed(2))
          );
          return;
        }
      }

      // Fetch new exchange rates if cache is expired or missing
      if (localCurrency !== "KES") {
        try {
          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`
          );
          const data = await response.json();

          // Cache new exchange rates with timestamp
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), rates: data.rates })
          );

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
    <span className="font-bold">
      {localCurrency} {formatNumber(convertedPrice)}
    </span>
  );
};

export default CurrencyConverter;
