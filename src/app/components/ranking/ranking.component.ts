import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeadToHead } from '../../classes/head-to-head';
import { Name } from '../../classes/name';
import { DraggableList } from '../draggable-list/draggable-list.component';

@Component({
  imports: [DraggableList],
  selector: 'app-ranking',
  standalone: true,
  styleUrls: ['./ranking.component.css'],
  templateUrl: './ranking.component.html'
})
export class RankingComponent {
  @Input({ required: true })
  public headToHead!: HeadToHead;

  @Output()
  public complete: EventEmitter<void> = new EventEmitter();

  public names!: Array<string>;

  public ngOnChanges(): void {
    this.names = this.headToHead.names.sort((_a: Name, _b: Name) => Math.random() - Math.random()).map((name: Name) => name.name);
  }

  public onDone(): void {
    const orderedNames: Array<Name> = this.names.map((name: string) => {
      return this.headToHead.find(name)!;
    });

    this.headToHead.resolve(orderedNames);

    this.complete.emit();
  }
}
