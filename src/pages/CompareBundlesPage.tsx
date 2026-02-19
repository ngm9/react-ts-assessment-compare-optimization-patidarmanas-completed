import React from "react";
import { useAssessmentSelection } from "../context/AssessmentSelectionContext";
import { CompareBundleTable } from "../components/CompareBundleTable";

export function CompareBundlesPage(): JSX.Element {
  const { selectedBundles, totals, clearSelection } = useAssessmentSelection();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div>
          <div style={{ fontWeight: 600 }}>Compare selected assessment bundles</div>
          <div style={{ fontSize: "13px", color: "#4a5568" }}>
            There are {selectedBundles.length.toString(10)} bundles in your comparison set.
          </div>
        </div>
        <button
          type="button"
          onClick={clearSelection}
          style={{ padding: "6px 10px", fontSize: "13px", borderRadius: "4px", border: "1px solid #c53030", color: "#c53030", backgroundColor: "#ffffff" }}
        >
          Clear selection
        </button>
      </div>
      {selectedBundles.length === 0 ? (
        <div style={{ fontSize: "14px" }}>No assessment bundles selected. Go back to the list and add bundles to compare.</div>
      ) : (
        <div>
          <div style={{ marginBottom: "8px", fontSize: "13px", color: "#4a5568" }}>
            Total monthly price: ${totals.totalPricePerMonth.toFixed(2)}. Combined active candidates: {totals.totalActiveCandidates.toString(10)}.
            Combined seats: {totals.totalAvailableSeats.toString(10)}. Total estimated minutes across all selected bundles: {totals.totalEstimatedMinutes.toString(10)}.
          </div>
          <CompareBundleTable bundles={selectedBundles} />
        </div>
      )}
    </div>
  );
}
