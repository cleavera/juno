import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { League } from '../../classes/league';
import { LeagueExportComponent } from '../league-export/league-export.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeagueExportComponent],
  selector: 'app-league',
  standalone: true,
  styleUrls: ['./league.component.css'],
  templateUrl: './league.component.html'
})
export class LeagueComponent {
  public league: InputSignal<League> = input.required<League>();
}
