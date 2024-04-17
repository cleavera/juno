import { Injectable } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { capitalise } from '../helpers/capitalise.helper';

@Injectable({ providedIn: 'root' })
export class HeadToHeadSerialiserService {
  public deserialise(serialised: string, league: League): HeadToHead {
    if (serialised === '') {
      throw new Error('Empty round');
    }

    let names: Array<Name> = [];
    let result: Array<Array<Name>> = [];

    serialised.split(':').map((nameAndRank: string) => {
      const [nameString, rank] = nameAndRank.split('#');
      const name: Name = league.find(capitalise(nameString))!;

      names.push(name);

      if (rank !== '~') {
        const i = parseInt(rank, 10);

        if (!result[i]) {
          result[i] = [name];
        } else {
          result[i].push(name);
        }
      }
    });

    if (result.length === 0) {
      return new HeadToHead(names);
    }

    return new HeadToHead(names, result);
  }

  public serialise(headToHead: HeadToHead): string {
    const result: ReadonlyArray<ReadonlyArray<Name>> | null = headToHead.result();

    if (result === null) {
      return headToHead.names.map((name: Name) => {
        return `${name.name.toLowerCase()}#~`;
      }).join(':');
    }

    return result.map((names: ReadonlyArray<Name>, index: number) => {
      return names.map((name: Name) => {
        return `${name.name.toLowerCase()}#${index}`;
      });
    }).join(':');
  }
}
