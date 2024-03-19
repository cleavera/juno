import { Component, Input, inject } from '@angular/core';
import { League } from '../../classes/league';
import { Round } from '../../classes/round';
import { LeagueFactory } from '../../services/league.factory';
import { RoundFactory } from '../../services/round.factory';
import { RankingComponent } from '../ranking/ranking.component';

@Component({
  imports: [RankingComponent],
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

  public onComplete(): void {
    this._leagueFactory.store(this.league);

    if (this.round.isComplete()) {
      this.round = this._roundFactory.evenDistribution(10, this.league);
    }

    this._roundFactory.store(this.round);
  }
}
