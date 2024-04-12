import { WritableSignal, signal } from '@angular/core';

export class Name {
  public readonly name: string;
  public readonly rating: WritableSignal<number>;
  public readonly plays: WritableSignal<number>;

  constructor(name: string, rating: number, plays: number) {
    this.name = name;
    this.rating = signal(rating);
    this.plays = signal(plays);
  }
}
