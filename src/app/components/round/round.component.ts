import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { League } from '../../classes/league';
import { Round } from '../../classes/round';
import { RoundType } from '../../constants/round-type.constant';
import { LeagueFactory } from '../../services/league.factory';
import { RoundFactory } from '../../services/round.factory';
import { FaceOffComponent } from '../face-off/face-off.component';
import { RankingComponent } from '../ranking/ranking.component';
import { RoundProgressComponent } from '../round-progress/round-progress.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaceOffComponent, RankingComponent, RoundProgressComponent, NgIf],
  selector: 'app-round',
  standalone: true,
  styleUrls: ['./round.component.css'],
  templateUrl: './round.component.html'
})
export class RoundComponent {
  @Input({ required: true })
  public round!: Round;

  @Input({ required: true })
  public league!: League;

  private readonly _leagueFactory: LeagueFactory = inject(LeagueFactory);
  private readonly _roundFactory: RoundFactory = inject(RoundFactory);

  public isRanking(): boolean {
    return this.round.roundType === RoundType.EVEN_DISTRIBUTION || this.round.roundType === RoundType.WEIGHTED_DISTRIBUTION;
  }

  public isFaceOff(): boolean {
    return this.round.roundType === RoundType.FACEOFF;
  }

  public onComplete(): void {
    this._leagueFactory.store(this.league);

    if (this.round.isComplete()) {
      this.league.rounds += 1;
      this.round = this._roundFactory.next(this.league);
    }

    this._roundFactory.store(this.round);
  }
}
