export class Name {
  public readonly name: string;
  public rating: number;
  public plays: number;

  constructor(name: string, rating: number, plays: number) {
    this.name = name;
    this.rating = rating;
    this.plays = plays;
  }
}
