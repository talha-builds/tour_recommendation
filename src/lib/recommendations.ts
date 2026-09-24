import { Database } from "@/types/supabase";

type Tour = Database["public"]["Tables"]["tours"]["Row"] & {
  destinations?: { country: string } | null;
};
type UserPreferences = Database["public"]["Tables"]["user_preferences"]["Row"];

export type RecommendedTour = Tour & { matchScore: number };

/**
 * Calculates a match score for a list of tours based on user preferences.
 * 
 * Scoring Logic:
 * - Exact Budget Match: +5 points
 * - Exact Difficulty Match: +5 points
 * 
 * Note: Since "budget" implies a price range, we can map preferred_budget 
 * to price brackets if we want, but for this simple engine we map the 
 * budget string directly if available, or we derive it from price.
 * For this version, we will derive a budget string from the price:
 * < $1500 = budget, < $2500 = moderate, else luxury.
 */
export function calculateRecommendations(tours: Tour[], prefs: UserPreferences | null): RecommendedTour[] {
  if (!prefs) {
    // If no preferences, just return tours with score 0
    return tours.map(t => ({ ...t, matchScore: 0 }));
  }

  const scoredTours = tours.map(tour => {
    let score = 0;

    // 1. Difficulty Match
    if (tour.difficulty === prefs.preferred_difficulty) {
      score += 5;
    } else if (
      (prefs.preferred_difficulty === 'moderate' && (tour.difficulty === 'easy' || tour.difficulty === 'hard'))
    ) {
      // Partial match for difficulty proximity
      score += 2;
    }

    // 2. Budget Match (Derive tour budget from price)
    let tourBudget = 'luxury';
    if (tour.price <= 1500) tourBudget = 'budget';
    else if (tour.price <= 2500) tourBudget = 'moderate';

    if (tourBudget === prefs.preferred_budget) {
      score += 5;
    } else if (
      (prefs.preferred_budget === 'luxury' && tourBudget === 'moderate') ||
      (prefs.preferred_budget === 'moderate' && tourBudget === 'budget')
    ) {
      // It's cheaper than their max budget, which is a good partial match!
      score += 3;
    }

    return {
      ...tour,
      matchScore: score,
    };
  });

  // Sort descending by matchScore
  return scoredTours.sort((a, b) => b.matchScore - a.matchScore);
}
