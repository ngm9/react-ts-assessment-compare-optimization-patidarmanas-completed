import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AssessmentSelectionProvider } from "./context/AssessmentSelectionContext";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AssessmentSelectionProvider>
          <App />
        </AssessmentSelectionProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
