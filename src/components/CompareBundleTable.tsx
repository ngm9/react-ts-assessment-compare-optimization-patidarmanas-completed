import React from "react";
import { AssessmentBundle, BundleAnalytics } from "../types";
import { computeBundleAnalytics } from "../utils/bundleAnalytics";

interface CompareBundleTableProps {
  bundles: AssessmentBundle[];
}

export function CompareBundleTable(props: CompareBundleTableProps): JSX.Element {
  const { bundles } = props;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Bundle</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Level</th>
          <th style={{ textAlign: "right", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Price / month</th>
          <th style={{ textAlign: "right", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Questions</th>
          <th style={{ textAlign: "right", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Minutes</th>
          <th style={{ textAlign: "right", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Candidates</th>
          <th style={{ textAlign: "right", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Seats</th>
          <th style={{ textAlign: "right", borderBottom: "1px solid #e2e8f0", padding: "8px" }}>Load ratio</th>
        </tr>
      </thead>
      <tbody>
        {bundles.map((bundle) => {
          const analytics: BundleAnalytics = computeBundleAnalytics(bundle);
          const ratioText = analytics.candidateToSeatRatio === 0 ? "0" : analytics.candidateToSeatRatio.toFixed(2);
          return (
            <tr key={bundle.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7" }}>{bundle.title}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7" }}>{bundle.level}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7", textAlign: "right" }}>
                ${bundle.pricePerMonth.toFixed(2)}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7", textAlign: "right" }}>
                {analytics.totalQuestions.toString(10)}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7", textAlign: "right" }}>
                {analytics.totalMinutes.toString(10)}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7", textAlign: "right" }}>
                {bundle.activeCandidates.toString(10)}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7", textAlign: "right" }}>
                {bundle.availableSeats.toString(10)}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #edf2f7", textAlign: "right" }}>
                {ratioText}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
