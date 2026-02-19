import React from "react";
import { useAssessmentBundles } from "../hooks/useAssessmentBundles";
import { isRemoteSuccess } from "../types";
import { AssessmentBundleList } from "../components/AssessmentBundleList";
import { useAssessmentSelection } from "../context/AssessmentSelectionContext";

export function AssessmentBundlesPage(): JSX.Element {
  const { remoteData, reload } = useAssessmentBundles();
  const { selectedIds } = useAssessmentSelection();

  if (remoteData.status === "loading" || remoteData.status === "idle") {
    return <div>Loading assessment bundles...</div>;
  }

  if (remoteData.status === "error") {
    return (
      <div>
        <div style={{ marginBottom: "8px", color: "#c53030" }}>Unable to load assessment bundles.</div>
        <button
          type="button"
          onClick={reload}
          style={{ padding: "6px 10px", fontSize: "13px", borderRadius: "4px", border: "1px solid #4a5568" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (isRemoteSuccess(remoteData)) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <div>
          <div style={{ marginBottom: "8px", fontWeight: 600 }}>
            {remoteData.data.length.toString(10)} assessment bundles
          </div>
          <AssessmentBundleList bundles={remoteData.data} />
        </div>
        <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "16px" }}>
          <div style={{ fontWeight: 600, marginBottom: "8px" }}>Selection summary</div>
          <div style={{ marginBottom: "4px" }}>Selected for comparison: {selectedIds.length.toString(10)}</div>
          <div style={{ fontSize: "13px", color: "#4a5568" }}>
            Use the compare view to see detailed analytics and pricing for selected assessment bundles side by side.
          </div>
        </div>
      </div>
    );
  }

  return <div>Unexpected state</div>;
}
