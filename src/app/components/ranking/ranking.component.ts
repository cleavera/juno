import { Component, EventEmitter, InputSignal, Output, Signal, computed, input } from '@angular/core';
import { HeadToHead } from '../../classes/head-to-head';
import { Name } from '../../classes/name';
import { randomise } from '../../helpers/randomise.helper';
import { DraggableList } from '../draggable-list/draggable-list.component';
import { InfoComponent } from '../info/info.component';
import { ProgressButtonComponent } from '../progress-button/progress-button.component';

@Component({
  imports: [DraggableList, InfoComponent, ProgressButtonComponent],
  selector: 'app-ranking',
  standalone: true,
  styleUrls: ['./ranking.component.css'],
  templateUrl: './ranking.component.html'
})
export class RankingComponent {
  public headToHead: InputSignal<HeadToHead> = input.required<HeadToHead>();

  @Output()
  public complete: EventEmitter<void> = new EventEmitter();

  public names: Signal<Array<string>>;

  constructor() {
    this.names = computed(() => {
      return randomise(this.headToHead().names).map((name: Name) => name.name)
    });
  }

  public onDone(): void {
    const orderedNames: Array<Name> = this.names().map((name: string) => {
      return this.headToHead().find(name)!;
    });

    this.headToHead().resolve(orderedNames.map((name: Name) => [name]));

    this.complete.emit();
  }
}
