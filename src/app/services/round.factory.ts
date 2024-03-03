import { Injectable } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { PersistenceService } from './persistence.service';
import { RoundSerialiserService } from './round-serialiser.service';

@Injectable()
export class RoundFactory {
  private readonly persistenceService: PersistenceService;
  private readonly roundSerialiserService: RoundSerialiserService;

  constructor(persistenceService: PersistenceService, roundSerialiserService: RoundSerialiserService) {
    this.persistenceService = persistenceService;
    this.roundSerialiserService = roundSerialiserService;
  }

  public evenDistribution(size: number, league: League): Array<HeadToHead> {
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

    return out;
  }

  public restore(league: League): Array<HeadToHead> | null {
    const serialised: string | null = this.persistenceService.load('round');

    if (serialised === null || serialised === '') {
      return this.evenDistribution(10, league);
    }

    return this.roundSerialiserService.deserialise(serialised, league);
  }

  public store(round: Array<HeadToHead>): void {
    this.persistenceService.save('round', this.roundSerialiserService.serialise(round));
  }
}
