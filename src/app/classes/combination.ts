export class Combination {
  public name: string;
  public myRating: number;
  public theirRating: number; 
  public combined: number;
  public total: number;
  public min: number;
  public max: number;

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
