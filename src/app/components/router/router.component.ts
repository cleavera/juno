import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
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
  imports: [ComparisonComponent, LeagueComponent, NavigationBarComponent, GameComponent],
  selector: 'app-router',
  standalone: true,
  styleUrls: ['./router.component.css'],
  templateUrl: './router.component.html'
})
export class RouterComponent {
  public state: WritableSignal<States>;

  public league!: League;
  public round!: Round;
  public isRound: Signal<boolean>;
  public isLeague: Signal<boolean>;
  public isComparison: Signal<boolean>;

  private readonly _leagueFactory: LeagueFactory = inject(LeagueFactory);

  constructor() {
    this.state = signal(States.ROUND);
    this.isRound = computed(() => this.state() === States.ROUND);
    this.isLeague = computed(() => this.state() === States.LEAGUE);
    this.isComparison = computed(() => this.state() === States.COMPARISON);
  }

  public ngOnInit() {
    this.league = this._leagueFactory.restore();
  }

  public onNavigate(state: States): void {
    this.state.set(state);
  }
}
