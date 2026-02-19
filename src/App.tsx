import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AssessmentBundlesPage } from "./pages/AssessmentBundlesPage";
import { CompareBundlesPage } from "./pages/CompareBundlesPage";

function App(): JSX.Element {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header style={{ padding: "16px", borderBottom: "1px solid #e2e8f0", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>Utkrusht Assessment Bundles</div>
        <nav style={{ display: "flex", gap: "12px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>Browse Bundles</Link>
          <Link to="/compare" style={{ textDecoration: "none" }}>Compare Selected</Link>
        </nav>
      </header>
      <main style={{ padding: "0 16px 32px" }}>
        <Routes>
          <Route path="/" element={<AssessmentBundlesPage />} />
          <Route path="/compare" element={<CompareBundlesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
