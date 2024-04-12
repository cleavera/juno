import { Signal, computed } from '@angular/core';
import { RoundType } from '../constants/round-type.constant';
import { HeadToHead } from './head-to-head';

export class Round {
  public readonly roundType: RoundType;
  public readonly headToHeads: ReadonlyArray<HeadToHead>;
  public readonly nextMatchup: Signal<HeadToHead | null>;
  public readonly isComplete: Signal<boolean>;
  public readonly progress: Signal<number>;

  constructor(headToHeads: Array<HeadToHead>, roundType: RoundType) {
    this.headToHeads = headToHeads;
    this.roundType = roundType;

    this.nextMatchup = computed(() => {
      return this.headToHeads.find((headToHead: HeadToHead) => {
        return headToHead.result() === null;
      }) ?? null;
    });

    this.isComplete = computed(() => {
      return this.nextMatchup() === null;
    });

    this.progress = computed(() => {
      if (this.isComplete()) {
        return 1;
      }

      return this.headToHeads.indexOf(this.nextMatchup()!) / this.headToHeads.length;
    });
  }
}
