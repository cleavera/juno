import { HeadToHead } from './head-to-head';

export class Round {
  public headToHeads: Array<HeadToHead>;

  constructor(headToHeads: Array<HeadToHead>) {
    this.headToHeads = headToHeads;
  }

  public nextMatchup(): HeadToHead | null {
    return this.headToHeads.find((headToHead: HeadToHead) => {
      return headToHead.result === null;
    }) ?? null;
  }
  
  public isComplete(): boolean {
    return this.nextMatchup() === null;
  }
}
