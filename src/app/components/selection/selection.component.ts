import { Component, InputSignal, OutputEmitterRef, Signal, WritableSignal, computed, input, output, signal } from '@angular/core';
import { HeadToHead } from '../../classes/head-to-head';
import { Name } from '../../classes/name';
import { randomise } from '../../helpers/randomise.helper';
import { InfoComponent } from '../info/info.component';
import { ProgressButtonComponent } from '../progress-button/progress-button.component';

@Component({
  imports: [InfoComponent, ProgressButtonComponent],
  selector: 'app-selection',
  standalone: true,
  styleUrl: './selection.component.css',
  templateUrl: './selection.component.html'
})
export class SelectionComponent {
  public headToHead: InputSignal<HeadToHead> = input.required<HeadToHead>();
  public complete: OutputEmitterRef<void> = output<void>();

  public names: Signal<Array<string>>;
  public selected: WritableSignal<Set<string>>;
  public selectionCount: Signal<number>;

  constructor() {
    this.names = computed(() => {
      return randomise(this.headToHead().names).map((name: Name) => name.name)
    });

    this.selectionCount = computed(() => {
      return this.names().length / 2;
    });

    this.selected = signal(new Set(), { equal: (xs: Set<String>, ys: Set<String>): boolean => xs.size === ys.size && [...xs].every((x) => ys.has(x)) });
  }

  public onSelect(name: string): void {
    this.selected.update((selected: Set<string>) => {
      if (selected.has(name)) { 
        selected.delete(name);
      } else if (selected.size < this.selectionCount()) {
        selected.add(name);
      }

      return selected;
    });
  }

  public onDone(): void {
    if (this.selected().size < this.selectionCount()) {
      return;
    }

    const result: [Array<Name>, Array<Name>] = this.headToHead().names.reduce((acc: [Array<Name>, Array<Name>], name: Name) => {
      if (this.selected().has(name.name)) {
        acc[0].push(name);
      } else {
        acc[1].push(name);
      }

      return acc;
    }, [[], []])

    this.headToHead().resolve(result);
    this.selected.set(new Set());
    this.complete.emit();
  }
}
