import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TopicsProvider } from "./contexts/Topics.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TopicsProvider>
      <App />
    </TopicsProvider>
  </StrictMode>
);
