import { RoundType } from '../constants/round-type.constant';
import { HeadToHead } from './head-to-head';

export class Round {
  public roundType: RoundType;
  public headToHeads: Array<HeadToHead>;

  constructor(headToHeads: Array<HeadToHead>, roundType: RoundType) {
    this.headToHeads = headToHeads;
    this.roundType = roundType;
  }

  public nextMatchup(): HeadToHead | null {
    return this.headToHeads.find((headToHead: HeadToHead) => {
      return headToHead.result === null;
    }) ?? null;
  }
  
  public isComplete(): boolean {
    return this.nextMatchup() === null;
  }

  public progress(): number {
    if (this.isComplete()) {
      return 1;
    }

    return this.headToHeads.indexOf(this.nextMatchup()!) / this.headToHeads.length;
  }
}
