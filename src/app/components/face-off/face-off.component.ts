import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HeadToHead } from '../../classes/head-to-head';
import { Name } from '../../classes/name';
import { InfoComponent } from '../info/info.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfoComponent],
  selector: 'app-face-off',
  standalone: true,
  styleUrls: ['./face-off.component.css'],
  templateUrl: './face-off.component.html'
})
export class FaceOffComponent {
  @Input({ required: true })
  public headToHead!: HeadToHead;

  @Output()
  public complete: EventEmitter<void> = new EventEmitter();

  public name1!: Name;
  public name2!: Name;

  public ngOnChanges(): void {
    if (!this.headToHead) {
      return;
    }

    if (Math.random() < 0.5) {
      this.name1 = this.headToHead.names[0];
      this.name2 = this.headToHead.names[1];
    } else {
      this.name1 = this.headToHead.names[1];
      this.name2 = this.headToHead.names[0];
    }
  }

  public onName1(): void {
    this.headToHead.resolve([this.name1, this.name2]);
    this.complete.emit();
  }

  public onName2(): void {
    this.headToHead.resolve([this.name2, this.name1]);
    this.complete.emit();
  }
}
