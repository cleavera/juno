import { Combination } from './combination';

export class Comparison {
  public combinations: Array<Combination>;
  public max: number;
  public min: number;

  constructor(combinations: Array<Combination>, max: number, min: number) {
    this.combinations = combinations;
    this.max = max;
    this.min = min;
  }
}
