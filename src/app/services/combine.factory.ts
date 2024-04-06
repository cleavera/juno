import { Injectable } from '@angular/core';
import { Combination } from '../classes/combination';
import { League } from '../classes/league';
import { Name } from '../classes/name';

@Injectable()
export class CombineFactory {
  public create(myLeague: League, theirLeague: League): Array<Combination> {
    return myLeague.names.map((name: Name) => {
      for (let theirName of theirLeague.names) {
        if (name.name === theirName.name) {
          return new Combination(name.name, name.rating, theirName.rating, this._calculateTotal(name.rating, theirName.rating));
        }
      }

      return null;
    }).filter((combination: Combination | null): boolean => combination !== null) as Array<Combination>;
  }

  private _calculateTotal(myRating: number, theirRating: number): number {
    return 2 / ((1 / myRating) + (1 / theirRating));
  }
}
