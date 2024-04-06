import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input({ required: true })
  public league!: League;
}
