import { WritableSignal, signal } from '@angular/core';
import { Name } from './name';

export class HeadToHead {
  public names: ReadonlyArray<Name>;
  public result: WritableSignal<ReadonlyArray<Name> | null>;

  constructor(names: ReadonlyArray<Name>, result: ReadonlyArray<Name> | null = null) {
    this.names = names;
    this.result = signal(result);
  }

  public resolve(names: ReadonlyArray<Name>): void {
    names.forEach((name: Name, index: number) => {
      let adjustment: number = 0;

      names.forEach((other: Name, otherIndex: number) => {
        if (name === other) {
          return;
        }

        if (index < otherIndex) {
          adjustment += this.ratingAdjustment(name, other, 1);
        } else {
          adjustment += this.ratingAdjustment(name, other, 0);
        }
      });

      const centralName: Name = this.find(name.name)!;
      centralName.rating.update((rating: number) => rating + adjustment);
      centralName.plays.update((plays: number) => plays + 1);
    });

    this.result.set(names.map((name: Name) => {
      return this.find(name.name)!;
    }));
  }

  public find(name: string): Name | null {
    return this.names.find((n: Name) => n.name === name) ?? null;
  }

  private ratingAdjustment(self: Name, other: Name, actualScore: 0 | 1): number {
    const expectedProbability = 1 / (1 + 10 ** ((other.rating() - self.rating()) / 400));

    return Math.round(32 * (actualScore - expectedProbability));
  }
}
