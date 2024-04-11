import { Injectable } from '@angular/core';
import { Combination } from '../classes/combination';
import { Comparison } from '../classes/comparison';
import { League } from '../classes/league';
import { Name } from '../classes/name';

@Injectable()
export class ComparisonFactory {
  public create(myLeague: League, theirLeague: League): Comparison {
    const combinations: Array<Combination> = myLeague.names.map((name: Name) => {
      for (let theirName of theirLeague.names) {
        if (name.name === theirName.name) {
          return new Combination(name.name, name.rating, theirName.rating, this._calculateTotal(name.rating, theirName.rating));
        }
      }

      return null;
    }).filter((combination: Combination | null): boolean => combination !== null) as Array<Combination>;

    this._sort(combinations);

    return new Comparison(combinations);
  }

  private _calculateTotal(myRating: number, theirRating: number): number {
    return 2 / ((1 / myRating) + (1 / theirRating));
  }

  private _sort(combinations: Array<Combination>): void {
    combinations.sort((a: Combination, b: Combination) => {
      if (a.combined < b.combined) {
        return 1;
      }

      if (a.combined > b.combined) {
        return -1;
      }

      if (a.min < b.min) {
        return 1;
      }

      if (a.min > b.min) {
        return -1;
      }

      if (a.total < b.total) {
        return 1;
      }

      if (a.total > b.total) {
        return -1;
      }

      return 0;
    });
  }
}
