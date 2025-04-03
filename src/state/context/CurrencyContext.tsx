import { createContext, useEffect, useState, ReactNode } from "react";
import { currencyMapping } from "@/constants/constant";

const DEFAULT_CURRENCY = "KES"; // Default currency
const BASE_CURRENCY = "KES"; // Prices stored in KES
const CACHE_KEY = "exchange_rates"; // Cache key
const CACHE_EXPIRATION_HOURS = 24; // Cache expiry time

type CurrencyContextType = {
  localCurrency: string;
  exchangeRates: Record<string, number>;
};

export const CurrencyContext = createContext<CurrencyContextType>({
  localCurrency: DEFAULT_CURRENCY,
  exchangeRates: {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [localCurrency, setLocalCurrency] = useState(DEFAULT_CURRENCY);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const detectCurrencyAndFetchRates = async () => {
      let userCountry = "KE"; // Default Kenya

      try {
        // Detect country via IP
        const ipResponse = await fetch("https://ipapi.co/country/");
        const countryCode = await ipResponse.text();
        userCountry = countryCode.toUpperCase();
      } catch (error) {
        console.error("Error fetching country:", error);
        // Fallback to navigator.language
        const userLang = navigator.language;
        userCountry = userLang.split("-")[1]?.toUpperCase() || "KE";
      }

      const targetCurrency = currencyMapping[userCountry] || DEFAULT_CURRENCY;
      setLocalCurrency(targetCurrency);

      // Check cached rates
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        try {
          const { timestamp, rates } = JSON.parse(cachedData);
          const cacheAge = (Date.now() - timestamp) / (1000 * 60 * 60); // Convert ms to hours

          if (cacheAge < CACHE_EXPIRATION_HOURS) {
            setExchangeRates(rates);
            return;
          }
        } catch (error) {
          console.error("Invalid cache data:", error);
        }
      }

      // Fetch new rates if cache is missing or expired
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`
        );
        const data = await response.json();

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), rates: data.rates })
        );

        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    detectCurrencyAndFetchRates();
  }, []);

  return (
    <CurrencyContext.Provider value={{ localCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
