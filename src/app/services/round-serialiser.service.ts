import { Injectable, inject } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Round } from '../classes/round';
import { RoundType } from '../constants/round-type.constant';
import { HeadToHeadSerialiserService } from './head-to-head-serialiser.service';

function isRoundType(value: any): value is RoundType {
  return Object.values(RoundType).includes(value);
}

@Injectable()
export class RoundSerialiserService {
  private readonly _headToHeadSerialiserService: HeadToHeadSerialiserService = inject(HeadToHeadSerialiserService);

  public deserialise(serialised: string, league: League): Round | null {
    if (serialised === '') {
      throw new Error('Empty round');
    }

    const [headToHeads, roundType] = serialised.split('|');

    if (!isRoundType(roundType)) {
      throw new Error('Invalid round type');
    }

    return new Round(headToHeads.split(';').map((roundString: string) => {
      return this._headToHeadSerialiserService.deserialise(roundString, league);
    }), roundType);
  }

  public serialise(round: Round): string {
    return round.headToHeads.map((headToHead: HeadToHead) => {
      return this._headToHeadSerialiserService.serialise(headToHead);
    }).join(';') + `|${round.roundType}`;
  }
}
