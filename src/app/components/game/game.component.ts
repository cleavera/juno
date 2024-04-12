import { ChangeDetectionStrategy, Component, InputSignal, OnInit, WritableSignal, inject, input, signal } from '@angular/core';
import { League } from '../../classes/league';
import { Round } from '../../classes/round';
import { RoundFactory } from '../../services/round.factory';
import { RoundComponent } from '../round/round.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoundComponent],
  selector: 'app-game',
  standalone: true,
  styleUrls: ['./game.component.css'],
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  public league: InputSignal<League> = input.required<League>();

  public round!: WritableSignal<Round>;

  private readonly _roundFactory: RoundFactory = inject(RoundFactory);

  public ngOnInit(): void {
    this.round = signal(this._roundFactory.restore(this.league()) ?? this._roundFactory.next(this.league()));
  }

  public onComplete(): void {
    this.league().rounds.update((rounds: number) => rounds + 1);
    this.round.set(this._roundFactory.next(this.league()));
    this._roundFactory.store(this.round());
  }
}
