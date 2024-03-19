import { Injectable, inject } from '@angular/core';
import { HeadToHead } from '../classes/head-to-head';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { PersistenceService } from './persistence.service';
import { RoundSerialiserService } from './round-serialiser.service';
import { Round } from '../classes/round';

@Injectable()
export class RoundFactory {
  private readonly persistenceService: PersistenceService = inject(PersistenceService);
  private readonly roundSerialiserService: RoundSerialiserService = inject(RoundSerialiserService);

  public evenDistribution(size: number, league: League): Round {
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

    return new Round(out);
  }

  public restore(league: League): Round | null {
    const serialised: string | null = this.persistenceService.load('round');

    if (serialised === null || serialised === '') {
      return this.evenDistribution(10, league);
    }

    return this.roundSerialiserService.deserialise(serialised, league);
  }

  public store(round: Round): void {
    this.persistenceService.save('round', this.roundSerialiserService.serialise(round));
  }
}
