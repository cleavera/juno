import { Name } from './name';

export class League {
  public names: Array<Name>;
  public rounds: number;

  constructor(names: Array<Name>, rounds: number = 0) {
    this.names = names;
    this.rounds = rounds;
  }

  public find(name: string): Name | null {
    return this.names.find((n: Name) => n.name === name) ?? null;
  }

  public ranking(): Array<Name> {
    return this.names.concat().sort((a: Name, b: Name) => b.rating - a.rating);
  }
}
