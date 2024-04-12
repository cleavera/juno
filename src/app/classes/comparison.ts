import { Combination } from './combination';

export class Comparison {
  public readonly combinations: ReadonlyArray<Combination>;
  public readonly max: number;
  public readonly min: number;

  constructor(combinations: Array<Combination>, max: number, min: number) {
    this.combinations = combinations;
    this.max = max;
    this.min = min;
  }
}
