import { WritableSignal, signal } from '@angular/core';
import { Name } from './name';

export class HeadToHead {
  public readonly names: ReadonlyArray<Name>;
  public readonly result: WritableSignal<ReadonlyArray<ReadonlyArray<Name>> | null>;

  constructor(names: ReadonlyArray<Name>, result: ReadonlyArray<ReadonlyArray<Name>> | null = null) {
    this.names = names;
    this.result = signal(result);
  }

  public resolve(results: ReadonlyArray<ReadonlyArray<Name>>): void {
    results.forEach((names: ReadonlyArray<Name>, index: number) => {
      let adjustment: number = 0;

      names.forEach((name: Name) => {
        results.forEach((otherNames: ReadonlyArray<Name>, otherIndex: number) => {
          if (index === otherIndex) {
            return;
          }

          otherNames.forEach((otherName: Name) => {
            if (index < otherIndex) {
              adjustment += this.ratingAdjustment(name, otherName, 1);
            } else {
              adjustment += this.ratingAdjustment(name, otherName, 0);
            }
          });
        });

        const centralName: Name = this.find(name.name)!;
        centralName.rating.update((rating: number) => rating + adjustment);
        centralName.plays.update((plays: number) => plays + 1);
      });
    });

    this.result.set(results.map((names: ReadonlyArray<Name>) => {
      return names.map((name: Name) => {
        return this.find(name.name)!;
      });
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
