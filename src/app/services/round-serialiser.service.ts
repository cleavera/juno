import { Injectable, inject } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Round } from '../classes/round';
import { HeadToHeadSerialiserService } from './head-to-head-serialiser.service';

@Injectable()
export class RoundSerialiserService {
  private readonly _headToHeadSerialiserService: HeadToHeadSerialiserService = inject(HeadToHeadSerialiserService);

  public deserialise(serialised: string, league: League): Round | null {
    if (serialised === '') {
      throw new Error('Empty round');
    }

    return new Round(serialised.split(';').map((roundString: string) => {
      return this._headToHeadSerialiserService.deserialise(roundString, league);
    }));
  }

  public serialise(round: Round): string {
    return round.headToHeads.map((headToHead: HeadToHead) => {
      return this._headToHeadSerialiserService.serialise(headToHead);
    }).join(';');
  }
}
