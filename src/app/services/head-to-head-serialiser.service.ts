import { Injectable } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { capitalise } from '../helpers/capitalise.helper';

@Injectable()
export class HeadToHeadSerialiserService {
  public deserialise(serialised: string, league: League): HeadToHead {
    if (serialised === '') {
      throw new Error('Empty round');
    }

    let names: Array<Name> = [];
    let result: Array<Name> = [];

    serialised.split(':').map((nameAndRank: string) => {
      const [nameString, rank] = nameAndRank.split('#');
      const name: Name = league.find(capitalise(nameString))!;

      names.push(name);

      if (rank !== '~') {
        result[parseInt(rank, 10)] = name;
      }
    });

    if (result.length === 0) {
      return new HeadToHead(names);
    }

    return new HeadToHead(names, result);
  }

  public serialise(headToHead: HeadToHead): string {
    const result: ReadonlyArray<Name> | null = headToHead.result();

    if (result === null) {
      return headToHead.names.map((name: Name) => {
        return `${name.name.toLowerCase()}#~`;
      }).join(':');
    }

    return result.map((name: Name, index: number) => {
      return `${name.name.toLowerCase()}#${index}`;
    }).join(':');
  }
}
