import { Injectable } from '@angular/core';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { HeadToHead } from '../classes/head-to-head';
import { capitalise } from '../helpers/capitalise.helper';

@Injectable()
export class RoundSerialiserService {
  public deserialise(serialised: string, league: League): Array<HeadToHead> | null {
    if (serialised === '') {
      throw new Error('Empty round');
    }

    return serialised.split(';').map((roundString: string) => {
      return new HeadToHead(roundString.split(':').map((name: string) => {
        return league.find(capitalise(name))!;
      }));
    });
  }

  public serialise(round: Array<HeadToHead>): string {
    return round.map((headToHead: HeadToHead) => {
      return headToHead.names.map((name: Name) => {
        return name.name.toLowerCase();
      }).join(':');
    }).join(';');
  }
}
