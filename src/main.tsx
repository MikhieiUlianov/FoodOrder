import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";
import "./index.css";

import { CartContextProvider } from "./store/CartContext.js";
import { UserProgressContextProvider } from "./store/UserProgressContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProgressContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserProgressContextProvider>
  </React.StrictMode>
);
