import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./system";
import { store } from "./state";
import { Provider } from "react-redux";
import { CurrencyProvider } from "./state/context/CurrencyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </Provider>
  </StrictMode>
);
