import { Name } from './name';

export class League {
  public names: Array<Name>;

  constructor(names: Array<Name>) {
    this.names = names;
  }

  public find(name: string): Name | null {
    return this.names.find((n: Name) => n.name === name) ?? null;
  }

  public ranking(): Array<Name> {
    return this.names.sort((a: Name, b: Name) => b.rating - a.rating);
  }
}
