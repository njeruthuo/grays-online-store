import './index.css'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./system";
import { store } from "./state";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
