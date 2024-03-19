import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
export class AppComponent implements OnInit {
  public league!: League;
  public round!: Round;

  private readonly _leagueFactory: LeagueFactory = inject(LeagueFactory);
  private readonly _roundFactory: RoundFactory = inject(RoundFactory);

  public ngOnInit() {
    this.league = this._leagueFactory.restore();
    this.round = this._roundFactory.restore(this.league) ?? this._roundFactory.evenDistribution(10, this.league);
  }
}
