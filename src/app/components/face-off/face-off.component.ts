import { ChangeDetectionStrategy, Component, InputSignal, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { HeadToHead } from '../../classes/head-to-head';
import { Name } from '../../classes/name';
import { InfoComponent } from '../info/info.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InfoComponent],
  selector: 'app-face-off',
  standalone: true,
  styleUrl: './face-off.component.css',
  templateUrl: './face-off.component.html'
})
export class FaceOffComponent {
  public headToHead: InputSignal<HeadToHead> = input.required<HeadToHead>();
  public complete: OutputEmitterRef<void> = output<void>();

  public names: Signal<[Name, Name]>;

  constructor() {
    this.names = computed(() => {
      if (Math.random() < 0.5) {
        return [this.headToHead().names[0], this.headToHead().names[1]];
      }

      return [this.headToHead().names[1], this.headToHead().names[0]];
    });
  }

  public onName1(): void {
    this.headToHead().resolve([[this.names()[0]], [this.names()[1]]]);
    this.complete.emit();
  }

  public onName2(): void {
    this.headToHead().resolve([[this.names()[1]], [this.names()[0]]]);
    this.complete.emit();
  }
}
