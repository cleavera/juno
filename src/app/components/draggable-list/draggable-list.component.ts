import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, InputSignal, Signal, computed, input } from '@angular/core';

@Component({
  host: { '[style.--count]': 'count()' },
  imports: [CdkDropList, CdkDrag],
  selector: 'app-draggable-list',
  standalone: true,
  styleUrls: ['./draggable-list.component.css'],
  templateUrl: './draggable-list.component.html'
})
export class DraggableList {
  public items: InputSignal<Array<string>> = input.required<Array<string>>();
  public count: Signal<number>;
  
  constructor() {
    this.count = computed(() => this.items().length);
  }

  public drop(event: CdkDragDrop<Array<string>>) {
    moveItemInArray(this.items(), event.previousIndex, event.currentIndex);
  }
}
