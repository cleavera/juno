import { Injectable } from '@angular/core';
import { League } from '../classes/league';
import { Name } from '../classes/name';
import { capitalise } from '../helpers/capitalise.helper';

@Injectable()
export class LeagueSerialiserService {
  public deserialise(serialised: string): League {
    const names: Array<Name> = serialised.split(';').map((name: string) => this._deserialiseName(name));

    return new League(names);  
  }

  public serialise(league: League): string {
    return league.names.map((name: Name) => this._serialiseName(name)).join(';');
  }

  private _deserialiseName(name: string): Name {
    const [nameString, ratingString, playsString] = name.split(':');

    return new Name(capitalise(nameString), parseInt(ratingString, 36), parseInt(playsString, 36));
  }

  private _serialiseName(name: Name): string {
    return `${name.name.toLowerCase()}:${name.rating.toString(36)}:${name.plays.toString(36)}`;
  }

}
