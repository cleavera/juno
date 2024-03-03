import { Name } from './name';

export class HeadToHead {
  public names: Array<Name>;
  public result: Array<Name> | null = null;

  constructor(names: Array<Name>, result: Array<Name> | null = null) {
    this.names = names;
    this.result = result;
  }

  public resolve(names: Array<Name>): void {
    names.forEach((name: Name, index: number) => {
      let adjustment: number = 0;

      names.forEach((other: Name, otherIndex: number) => {
        if (name === other) {
          return;
        }

        if (index > otherIndex) {
          adjustment += this.ratingAdjustment(name, other, 1);
        } else {
          adjustment += this.ratingAdjustment(name, other, 0);
        }

      });

      this.find(name.name)!.rating += adjustment;
    });

    this.result = names.map((name: Name) => {
      return this.find(name.name)!;
    });
  }

  public find(name: string): Name | null {
    return this.names.find((n: Name) => n.name === name) ?? null;
  }

  private ratingAdjustment(self: Name, other: Name, actualScore: 0 | 1): number {
    const expectedProbability = 1 / (1 + 10 ** ((other.rating - self.rating) / 400));

    return Math.round(32 * (actualScore - expectedProbability));
  }
}
