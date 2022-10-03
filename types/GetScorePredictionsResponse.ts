import { DamPreciseScoringTotalScoreType } from "./DamPreciseScoringTotalScoreType";

/**
 * Score prediction
 */
export class ScorePrediction {
  /**
   * Time
   */
  readonly time!: string;

  /**
   * Time offset
   */
  readonly timeOffset!: number;

  /**
   * Score (Ingeger)
   */
  readonly scoreInteger!: number;

  /**
   * Score (String)
   */
  readonly scoreString!: string;

  /**
   * Score type
   */
  readonly scoreType!: DamPreciseScoringTotalScoreType;
}

/**
 * Get score predictions response
 */
export class GetScorePredictionsResponse {
  /**
   * Score predictions
   */
  readonly scorePredictions!: ScorePrediction[];
}
