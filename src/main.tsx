import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { initGlobalAnalyticsTracking } from "./utils/analytics";
import "./styles.css";

// Initialize global analytics (clicks on phone/whatsapp)
initGlobalAnalyticsTracking();

const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
