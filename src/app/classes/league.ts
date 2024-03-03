import { HeadToHead } from './head-to-head';
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

  public generateRound(size: number): Array<HeadToHead> {
    const out: Array<HeadToHead> = [];
    const count: number = Math.ceil(this.names.length / size);

    for (let i = 0; i < count; i += 1) {
      const headToHead: Array<Name> = [];

      for (let j = 0; j < size; j += 1) {
        if (i + (count * j) < this.names.length) {
          headToHead.push(this.names[i + (count * j)]);
        } else {
          headToHead.push(this.names[Math.floor(Math.random() * this.names.length)]);
        }
      }

      out.push(new HeadToHead(headToHead));
    }

    return out;
  }
}
