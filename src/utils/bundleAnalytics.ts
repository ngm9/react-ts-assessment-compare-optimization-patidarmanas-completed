import { AssessmentBundle, BundleAnalytics, SelectionTotals } from "../types";

export function computeBundleAnalytics(bundle: AssessmentBundle): BundleAnalytics {
  let totalQuestions = 0;
  let totalMinutes = 0;
  for (let i = 0; i < bundle.skillAreas.length; i += 1) {
    const skill = bundle.skillAreas[i];
    totalQuestions += skill.questions;
    totalMinutes += skill.estimatedMinutes;
  }
  const levelMultiplier = bundle.level === "advanced" ? 1.4 : bundle.level === "intermediate" ? 1.15 : 1;
  const normalizedScore = totalQuestions * levelMultiplier + totalMinutes * 0.3;
  const candidateToSeatRatio = bundle.availableSeats === 0 ? 0 : bundle.activeCandidates / bundle.availableSeats;
  return {
    totalQuestions,
    totalMinutes,
    normalizedScore,
    candidateToSeatRatio,
  };
}

export function calculateSelectionTotals(bundles: AssessmentBundle[]): SelectionTotals {
  let totalPricePerMonth = 0;
  let totalActiveCandidates = 0;
  let totalAvailableSeats = 0;
  let totalEstimatedMinutes = 0;

  for (let i = 0; i < bundles.length; i += 1) {
    const bundle = bundles[i];
    totalPricePerMonth += bundle.pricePerMonth;
    totalActiveCandidates += bundle.activeCandidates;
    totalAvailableSeats += bundle.availableSeats;
    for (let j = 0; j < bundle.skillAreas.length; j += 1) {
      totalEstimatedMinutes += bundle.skillAreas[j].estimatedMinutes;
    }
  }

  return {
    totalPricePerMonth,
    totalActiveCandidates,
    totalAvailableSeats,
    totalEstimatedMinutes,
  };
}
