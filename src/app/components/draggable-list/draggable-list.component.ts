import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
  imports: [CdkDropList, CdkDrag],
  selector: 'app-draggable-list',
  standalone: true,
  styleUrls: ['./draggable-list.component.css'],
  templateUrl: './draggable-list.component.html'
})
export class DraggableList implements OnChanges {
  @Input({ required: true })
  public items!: Array<string>;

  @HostBinding('style.--count')
  public count!: number;
  
  public ngOnChanges(): void {
    this.count = this.items.length;
  }

  public drop(event: CdkDragDrop<Array<string>>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
