import { Component, Input, Signal, computed } from '@angular/core';
import { Round } from '../../classes/round';

@Component({
  host: { '[style.--progress]': 'progress()' },
  selector: 'app-round-progress',
  standalone: true,
  styleUrls: ['./round-progress.component.css'],
  templateUrl: './round-progress.component.html',
})
export class RoundProgressComponent {
  @Input({ required: true })
  public round!: Round;

  public progress: Signal<string>;

  constructor() {
    this.progress = computed(() => `${Math.floor(this.round.progress() * 100)}%`);
  }
}
