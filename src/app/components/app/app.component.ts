import { ChangeDetectionStrategy, Component } from '@angular/core';
import { League } from '../../classes/league';
import { Round } from '../../classes/round';
import { LeagueFactory } from '../../services/league.factory';
import { RoundFactory } from '../../services/round.factory';
import { LeagueComponent } from '../league/league.component';
import { RoundComponent } from '../round/round.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeagueComponent, RoundComponent],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public league: League;
  public round: Round;

  private readonly _leagueFactory: LeagueFactory;
  private readonly _roundFactory: RoundFactory;

  constructor(leagueFactory: LeagueFactory, roundFactory: RoundFactory) {
    this._leagueFactory = leagueFactory;
    this._roundFactory = roundFactory;
    this.league = this._leagueFactory.restore();
    this.round = this._roundFactory.restore(this.league) ?? this._roundFactory.evenDistribution(10, this.league);
  }
}
