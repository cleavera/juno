import { ChangeDetectorRef, Component, HostBinding, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { Round } from '../../classes/round';

@Component({
  selector: 'app-round-progress',
  standalone: true,
  styleUrls: ['./round-progress.component.css'],
  templateUrl: './round-progress.component.html',
})
export class RoundProgressComponent {
  @Input({ required: true })
  public round!: Round;

  @HostBinding('style.--progress')
  public progress!: string;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    interval(500).pipe(takeUntilDestroyed()).subscribe(() => {
      this.progress = `${Math.floor(this.round.progress() * 100)}%`;
      changeDetectorRef.markForCheck();
    });
  }
}
