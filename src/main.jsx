import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { defineCustomElements } from "dinemaster-stencil-ui/loader";
import ErrorBoundary from "./components/fallback/ErrorBoundary.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

defineCustomElements();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
       <Provider store={store}>
          <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
