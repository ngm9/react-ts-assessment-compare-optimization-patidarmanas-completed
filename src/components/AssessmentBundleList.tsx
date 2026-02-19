import React from "react";
import { AssessmentBundle } from "../types";
import { AssessmentBundleCard } from "./AssessmentBundleCard";

interface AssessmentBundleListProps {
  bundles: AssessmentBundle[];
}

export function AssessmentBundleList(props: AssessmentBundleListProps): JSX.Element {
  const { bundles } = props;

  const sorted = [...bundles].sort((a, b) => {
    if (a.level === b.level) {
      return b.pricePerMonth - a.pricePerMonth;
    }
    if (a.level === "advanced") {
      return -1;
    }
    if (b.level === "advanced") {
      return 1;
    }
    if (a.level === "intermediate") {
      return -1;
    }
    return 1;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {sorted.map((bundle) => (
        <AssessmentBundleCard key={bundle.id} bundle={bundle} />
      ))}
    </div>
  );
}
