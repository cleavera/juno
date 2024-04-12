import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { League } from '../../classes/league';
import { Round } from '../../classes/round';
import { States } from '../../constants/states.constant';
import { LeagueFactory } from '../../services/league.factory';
import { ComparisonComponent } from '../comparison/comparison.component';
import { GameComponent } from '../game/game.component';
import { LeagueComponent } from '../league/league.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComparisonComponent, LeagueComponent, NavigationBarComponent, NgIf, GameComponent],
  selector: 'app-router',
  standalone: true,
  styleUrls: ['./router.component.css'],
  templateUrl: './router.component.html'
})
export class RouterComponent {
  public state: States = States.ROUND;

  public league!: League;
  public round!: Round;

  private readonly _leagueFactory: LeagueFactory = inject(LeagueFactory);

  public ngOnInit() {
    this.league = this._leagueFactory.restore();
  }

  public onNavigate(state: States): void {
    this.state = state;
  }

  public isRound(): boolean {
    return this.state === States.ROUND;
  }

  public isLeague(): boolean {
    return this.state === States.LEAGUE;
  }

  public isComparison(): boolean {
    return this.state === States.COMPARISON;
  }
}
