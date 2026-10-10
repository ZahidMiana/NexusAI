export interface RoiInputs {
  teamSize: number;
  hoursSavedPerWeek: number;
  hourlyCost: number;
  implementationCost: number;
}

export interface RoiResult {
  annualHoursSaved: number;
  annualSavings: number;
  roiPercent: number;
  paybackMonths: number;
}

const WORKING_WEEKS_PER_YEAR = 46;

/** Pure first-year ROI model for an agentic automation rollout. */
export function calculateRoi({ teamSize, hoursSavedPerWeek, hourlyCost, implementationCost }: RoiInputs): RoiResult {
  const annualHoursSaved = teamSize * hoursSavedPerWeek * WORKING_WEEKS_PER_YEAR;
  const annualSavings = annualHoursSaved * hourlyCost;
  const roiPercent = implementationCost > 0 ? ((annualSavings - implementationCost) / implementationCost) * 100 : 0;
  const monthlySavings = annualSavings / 12;
  const paybackMonths = monthlySavings > 0 ? implementationCost / monthlySavings : Number.POSITIVE_INFINITY;
  return { annualHoursSaved, annualSavings, roiPercent, paybackMonths };
}
