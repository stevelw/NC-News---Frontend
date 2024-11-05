import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TopicsProvider } from "./contexts/Topics.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TopicsProvider>
        <App />
      </TopicsProvider>
    </BrowserRouter>
  </StrictMode>
);
