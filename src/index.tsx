import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeProvider from "./themeProvider";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
