import { Injectable, inject } from '@angular/core';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { NAMES } from '../constants/names.constant';
import { LeagueSerialiserService } from './league-serialiser.service';
import { PersistenceService } from './persistence.service';

@Injectable({ providedIn: 'root' })
export class LeagueFactory {
  private static readonly STORAGE_KEY: string = 'league';
  private readonly persistenceService: PersistenceService = inject(PersistenceService);
  private readonly serialiserService: LeagueSerialiserService = inject(LeagueSerialiserService);

  public fresh(): League {
    return new League(NAMES.map((name: string) => new Name(name, 1500, 0)));
  }
  
  public restore(): League {
    const serialised: string | null = this.persistenceService.load(LeagueFactory.STORAGE_KEY);

    if (serialised === null) {
      return this.fresh();
    }

    return this.serialiserService.deserialise(serialised);
  }

  public store(league: League): void {
    this.persistenceService.save(LeagueFactory.STORAGE_KEY, this.serialiserService.serialise(league));
  }
}
