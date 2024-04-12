import { WritableSignal, signal } from '@angular/core';

export class Name {
  public readonly name: string;
  public rating: WritableSignal<number>;
  public plays: WritableSignal<number>;

  constructor(name: string, rating: number, plays: number) {
    this.name = name;
    this.rating = signal(rating);
    this.plays = signal(plays);
  }
}
