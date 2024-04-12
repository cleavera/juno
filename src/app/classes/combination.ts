export class Combination {
  public readonly name: string;
  public readonly myRating: number;
  public readonly theirRating: number; 
  public readonly combined: number;
  public readonly total: number;
  public readonly min: number;
  public readonly max: number;

  constructor(name: string, myRating: number, theirRating: number, combined: number) {
    this.name = name;
    this.myRating = myRating;
    this.theirRating = theirRating;
    this.combined = combined;
    this.total = myRating + theirRating;
    this.min = Math.min(myRating, theirRating);
    this.max = Math.max(myRating, theirRating);
  }
}
