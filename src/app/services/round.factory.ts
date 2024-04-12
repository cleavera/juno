import { Injectable, inject } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { Round } from '../classes/round';
import { RoundType } from '../constants/round-type.constant';
import { randomise } from '../helpers/randomise.helper';
import { PersistenceService } from './persistence.service';
import { RoundSerialiserService } from './round-serialiser.service';

@Injectable()
export class RoundFactory {
  private static readonly STORAGE_KEY: string = 'round';
  private readonly persistenceService: PersistenceService = inject(PersistenceService);
  private readonly roundSerialiserService: RoundSerialiserService = inject(RoundSerialiserService);

  public starting(size: number, league: League): Round {
    const out: Array<HeadToHead> = [];
    const count: number = Math.ceil(league.names.length / size);
    const names: Array<Name> = league.ranking();

    for (let i = 0; i < count; i += 1) {
      const headToHead: Array<Name> = [];

      for (let j = 0; j < size; j += 1) {
        if (i + (count * j) < names.length) {
          headToHead.push(names[i + (count * j)]);
        } else {
          headToHead.push(names[Math.floor(Math.random() * names.length)]);
        }
      }

      out.push(new HeadToHead(headToHead));
    }

    return new Round(out, RoundType.RANKING);
  }

  public faceOff(roundCount: number, league: League): Round {
    roundCount = Math.min(roundCount, league.names.length / 2);

    const indexes: Array<number> = randomise([...Array(roundCount).keys()]);
    const names: Array<Name> = league.ranking();
    const out: Array<HeadToHead> = [];

    for (let i = 0; i < indexes.length; i += 2) {
      out.push(new HeadToHead([names[indexes[i]], names[indexes[i + 1]]]));
    }

    return new Round(out, RoundType.FACEOFF);
  }

  public selection(roundCount: number, league: League): Round {
    roundCount = Math.min(roundCount, Math.floor(league.names.length / 30));

    const g1: Array<Name> = randomise(league.ranking().slice(0, roundCount * 2));
    const g2: Array<Name> = randomise(league.ranking().slice(roundCount * 2, (roundCount * (2 + 4))));
    const g3: Array<Name> = randomise(league.ranking().slice((roundCount * (2 + 4)), (roundCount * (2 + 4 + 6))));
    const g4: Array<Name> = randomise(league.ranking().slice((roundCount * (2 + 4 + 6)), league.names.length));

    const out: Array<HeadToHead> = [];

    for (let i = 0; i < (roundCount * 2); i += 2) {
      const j: number = i + 1;

      out.push(new HeadToHead([g1[i], g1[j], g2[i], g2[j], g3[i], g3[j], g4[i], g4[j]]));
    }

    return new Round(out, RoundType.SELECTION);
  }

  public next(league: League): Round {
    const index = league.rounds() % 5;

    switch (index) {
      case 0:
        return this.starting(10, league);
      case 1:
        return this.selection(30, league);
      case 2:
        return this.faceOff(100, league);
      case 3:
        return this.selection(20, league);
      case 4:
        return this.faceOff(50, league);
      default:
        throw new Error('Invalid round index');
    }
  }

  public restore(league: League): Round | null {
    const serialised: string | null = this.persistenceService.load(RoundFactory.STORAGE_KEY);

    if (serialised === null || serialised === '') {
      return null;
    }

    return this.roundSerialiserService.deserialise(serialised, league);
  }

  public store(round: Round): void {
    this.persistenceService.save(RoundFactory.STORAGE_KEY, this.roundSerialiserService.serialise(round));
  }
}
