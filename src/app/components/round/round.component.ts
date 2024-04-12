import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, Signal, computed, inject, input } from '@angular/core';
import { League } from '../../classes/league';
import { Round } from '../../classes/round';
import { RoundType } from '../../constants/round-type.constant';
import { LeagueFactory } from '../../services/league.factory';
import { RoundFactory } from '../../services/round.factory';
import { FaceOffComponent } from '../face-off/face-off.component';
import { RankingComponent } from '../ranking/ranking.component';
import { RoundProgressComponent } from '../round-progress/round-progress.component';
import { SelectionComponent } from '../selection/selection.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaceOffComponent, RankingComponent, RoundProgressComponent, SelectionComponent],
  selector: 'app-round',
  standalone: true,
  styleUrls: ['./round.component.css'],
  templateUrl: './round.component.html'
})
export class RoundComponent {
  public round: InputSignal<Round> = input.required<Round>();
  public league: InputSignal<League> = input.required<League>();

  @Output()
  public complete: EventEmitter<void> = new EventEmitter<void>();

  public isRanking: Signal<boolean>;
  public isSelection: Signal<boolean>;
  public isFaceOff: Signal<boolean>;

  private readonly _leagueFactory: LeagueFactory = inject(LeagueFactory);
  private readonly _roundFactory: RoundFactory = inject(RoundFactory);

  constructor() {
    this.isRanking = computed(() => this.round().roundType === RoundType.RANKING);
    this.isSelection = computed(() => this.round().roundType === RoundType.SELECTION);
    this.isFaceOff = computed(() => this.round().roundType === RoundType.FACEOFF);
  }

  public onComplete(): void {
    this._leagueFactory.store(this.league());
    this._roundFactory.store(this.round());

    if (this.round().isComplete()) {
      this.complete.emit();
    }
  }
}
