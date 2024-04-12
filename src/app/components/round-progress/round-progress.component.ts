import { ChangeDetectionStrategy, Component, InputSignal, Signal, computed, input } from '@angular/core';
import { Round } from '../../classes/round';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.--progress]': 'progress()' },
  selector: 'app-round-progress',
  standalone: true,
  styleUrls: ['./round-progress.component.css'],
  templateUrl: './round-progress.component.html',
})
export class RoundProgressComponent {
  public round: InputSignal<Round> = input.required<Round>();

  public progress: Signal<string>;

  constructor() {
    this.progress = computed(() => `${Math.floor(this.round().progress() * 100)}%`);
  }
}
