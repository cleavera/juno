import { WritableSignal, signal } from '@angular/core';

export class Name {
  public readonly name: string;
  public rating: number;
  public plays: WritableSignal<number>;

  constructor(name: string, rating: number, plays: number) {
    this.name = name;
    this.rating = rating;
    this.plays = signal(plays);
  }
}
