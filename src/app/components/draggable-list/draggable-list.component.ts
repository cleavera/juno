import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CdkDropList, CdkDrag],
  selector: 'app-draggable-list',
  standalone: true,
  styleUrls: ['./draggable-list.component.css'],
  templateUrl: './draggable-list.component.html'
})
export class DraggableList {
  @Input({ required: true })
  public items!: Array<string>;
  
  public drop(event: CdkDragDrop<Array<string>>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
