import React from "react";
import { AssessmentBundle, BundleAnalytics } from "../types";
import { computeBundleAnalytics } from "../utils/bundleAnalytics";
import { useAssessmentSelection } from "../context/AssessmentSelectionContext";

interface AssessmentBundleCardProps {
  bundle: AssessmentBundle;
}

export function AssessmentBundleCard(props: AssessmentBundleCardProps): JSX.Element {
  const { bundle } = props;
  const { selectedIds, toggleSelection } = useAssessmentSelection();
  const isSelected = selectedIds.indexOf(bundle.id) !== -1;
  const analytics: BundleAnalytics = computeBundleAnalytics(bundle);

  const backgroundColor = isSelected ? "#ebf8ff" : "#ffffff";

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        gap: "12px",
        backgroundColor,
      }}
    >
      <div>
        <img src={bundle.imageUrl} alt={bundle.title} width={120} height={80} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <div style={{ fontWeight: 600 }}>{bundle.title}</div>
          <div>{bundle.level.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: "13px", color: "#4a5568", marginBottom: "4px" }}>
          {bundle.skillAreas.length.toString(10)} skill areas, {analytics.totalQuestions.toString(10)} questions,
          approximately {analytics.totalMinutes.toString(10)} minutes
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
          <div>Price: ${bundle.pricePerMonth.toFixed(2)} per month</div>
          <div>
            Candidates: {bundle.activeCandidates.toString(10)} / seats: {bundle.availableSeats.toString(10)}
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleSelection(bundle.id)}
          style={{
            padding: "6px 10px",
            fontSize: "13px",
            borderRadius: "4px",
            border: "1px solid #3182ce",
            backgroundColor: isSelected ? "#3182ce" : "#ffffff",
            color: isSelected ? "#ffffff" : "#3182ce",
            cursor: "pointer",
          }}
        >
          {isSelected ? "Remove from compare" : "Add to compare"}
        </button>
      </div>
    </div>
  );
}
