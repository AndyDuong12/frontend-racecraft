import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Only load axe in development mode
if (import.meta.env.DEV) {
  import("@axe-core/react").then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
