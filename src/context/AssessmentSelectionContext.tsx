import React, { createContext, useContext, useState } from "react";
import { AssessmentBundle, SelectionTotals } from "../types";
import { useAssessmentBundles } from "../hooks/useAssessmentBundles";
import { calculateSelectionTotals } from "../utils/bundleAnalytics";

export interface AssessmentSelectionContextValue {
  selectedIds: string[];
  selectedBundles: AssessmentBundle[];
  totals: SelectionTotals;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
}

const AssessmentSelectionContext = createContext<AssessmentSelectionContextValue | undefined>(undefined);

interface AssessmentSelectionProviderProps {
  children: React.ReactNode;
}

export function AssessmentSelectionProvider(props: AssessmentSelectionProviderProps): JSX.Element {
  const { children } = props;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null);
  const { remoteData } = useAssessmentBundles();

  let bundles: AssessmentBundle[] = [];
  if (remoteData.status === "success") {
    bundles = remoteData.data;
  }

  const selectedBundles = bundles.filter((bundle) => selectedIds.indexOf(bundle.id) !== -1);
  const totals: SelectionTotals = calculateSelectionTotals(selectedBundles);

  const value: AssessmentSelectionContextValue = {
    selectedIds,
    selectedBundles,
    totals,
    toggleSelection: (id: string) => {
      setLastInteraction(new Date());
      setSelectedIds((current) => {
        if (current.indexOf(id) !== -1) {
          return current.filter((existing) => existing !== id);
        }
        return current.concat(id);
      });
    },
    clearSelection: () => {
      setLastInteraction(new Date());
      setSelectedIds([]);
    },
  };

  return <AssessmentSelectionContext.Provider value={value}>{children}</AssessmentSelectionContext.Provider>;
}

export function useAssessmentSelection(): AssessmentSelectionContextValue {
  const context = useContext(AssessmentSelectionContext);
  if (!context) {
    throw new Error("useAssessmentSelection must be used within AssessmentSelectionProvider");
  }
  return context;
}
