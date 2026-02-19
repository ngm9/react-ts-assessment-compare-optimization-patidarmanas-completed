import { AssessmentBundle, DifficultyLevel, SkillArea, UpdatableAssessmentBundle } from "../types";

const levels: DifficultyLevel[] = ["beginner", "intermediate", "advanced"];

function createSkillArea(index: number): SkillArea {
  const baseMinutes = 30 + (index % 5) * 15;
  const questions = 10 + (index % 7) * 3;
  return {
    id: "skill-" + index.toString(10),
    name: "Skill Area " + index.toString(10),
    questions,
    estimatedMinutes: baseMinutes,
  };
}

function createBundle(index: number): AssessmentBundle {
  const level = levels[index % levels.length];
  const skillAreas: SkillArea[] = [];
  const skillCount = 3 + (index % 4);
  for (let i = 0; i < skillCount; i += 1) {
    skillAreas.push(createSkillArea(index * 10 + i));
  }
  const basePrice = 49 + (index % 10) * 5;
  const activeCandidates = 50 + (index % 25) * 4;
  const availableSeats = 100 + (index % 40) * 3;
  return {
    id: "bundle-" + index.toString(10),
    title: "Assessment Bundle " + (index + 1).toString(10),
    level,
    pricePerMonth: basePrice,
    activeCandidates,
    availableSeats,
    imageUrl: "https://via.placeholder.com/120x80?text=Bundle+" + (index + 1).toString(10),
    skillAreas: skillAreas as AssessmentBundle["skillAreas"],
  };
}

function generateBundles(): AssessmentBundle[] {
  const bundles: AssessmentBundle[] = [];
  const count = 1000;
  for (let i = 0; i < count; i += 1) {
    bundles.push(createBundle(i));
  }
  return bundles;
}

const allBundles: AssessmentBundle[] = generateBundles();

export function fetchAssessmentBundles(): Promise<AssessmentBundle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const copy = allBundles.map((bundle) => ({ ...bundle }));
      resolve(copy);
    }, 400);
  });
}

export function updateAssessmentBundle(input: UpdatableAssessmentBundle): Promise<AssessmentBundle> {
  return new Promise((resolve, reject) => {
    const index = allBundles.findIndex((bundle) => bundle.id === input.id);
    if (index === -1) {
      reject(new Error("Bundle not found"));
      return;
    }
    const existing = allBundles[index];
    const updated: AssessmentBundle = {
      ...existing,
      ...input,
      id: existing.id,
    };
    allBundles[index] = updated;
    resolve({ ...updated });
  });
}
