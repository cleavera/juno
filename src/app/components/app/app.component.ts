import { ChangeDetectionStrategy, Component } from '@angular/core';
import { League } from '../../classes/league';
import { LeagueFactory } from '../../services/league.factory';
import { RankingComponent } from '../ranking/ranking.component';
import { HeadToHead } from '../../classes/head-to-head';
import { RoundFactory } from '../../services/round.factory';
import { LeagueComponent } from '../league/league.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeagueComponent, RankingComponent],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public league: League;
  public round: Array<HeadToHead>;

  private readonly _leagueFactory: LeagueFactory;
  private readonly _roundFactory: RoundFactory;

  constructor(leagueFactory: LeagueFactory, roundFactory: RoundFactory) {
    this._leagueFactory = leagueFactory;
    this._roundFactory = roundFactory;
    this.league = this._leagueFactory.restore();
    this.round = this._roundFactory.restore(this.league) ?? this._roundFactory.evenDistribution(10, this.league);
  }

  public onComplete(): void {
    this._leagueFactory.store(this.league);

    if (this.round.length === 1) {
      this.round = this._roundFactory.evenDistribution(10, this.league);
    } else {
      this.round.shift();
    }

    this._roundFactory.store(this.round);
  }
}
