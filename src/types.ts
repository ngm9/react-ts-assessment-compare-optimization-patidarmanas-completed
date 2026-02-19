export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface SkillArea {
  id: string;
  name: string;
  questions: number;
  estimatedMinutes: number;
}

export type NonEmptyArray<T> = T[] & { 0: T };

export interface AssessmentBundle {
  id: string;
  title: string;
  level: DifficultyLevel;
  pricePerMonth: number;
  activeCandidates: number;
  availableSeats: number;
  imageUrl: string;
  skillAreas: NonEmptyArray<SkillArea>;
}

export type AssessmentBundleLight = Pick<AssessmentBundle, "id" | "title" | "pricePerMonth" | "level">;

export type AssessmentBundleDictionary = Record<string, AssessmentBundle>;

export type RemoteIdle = { status: "idle" };

export type RemoteLoading = { status: "loading" };

export type RemoteSuccess<T> = { status: "success"; data: T };

export type RemoteError = { status: "error"; error: string };

export type RemoteData<T> = RemoteIdle | RemoteLoading | RemoteSuccess<T> | RemoteError;

export interface RemoteDataHookResult<T> {
  remoteData: RemoteData<T>;
  reload: () => void;
}

export type SelectionTotals = {
  totalPricePerMonth: number;
  totalActiveCandidates: number;
  totalAvailableSeats: number;
  totalEstimatedMinutes: number;
};

export interface BundleAnalytics {
  totalQuestions: number;
  totalMinutes: number;
  normalizedScore: number;
  candidateToSeatRatio: number;
}

export type UpdatableAssessmentBundle = Partial<Omit<AssessmentBundle, "id">> & { id: string };

export function isRemoteSuccess<T>(remote: RemoteData<T>): remote is RemoteSuccess<T> {
  return remote.status === "success";
}
