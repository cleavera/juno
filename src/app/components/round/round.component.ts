import { Component, Input } from '@angular/core';
import { Round } from '../../classes/round';
import { League } from '../../classes/league';
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

  private readonly _leagueFactory: LeagueFactory;
  private readonly _roundFactory: RoundFactory;

  constructor(leagueFactory: LeagueFactory, roundFactory: RoundFactory) {
    this._leagueFactory = leagueFactory;
    this._roundFactory = roundFactory;
  }

  public onComplete(): void {
    this._leagueFactory.store(this.league);

    if (this.round.isComplete()) {
      this.round = this._roundFactory.evenDistribution(10, this.league);
    }

    this._roundFactory.store(this.round);
  }
}
