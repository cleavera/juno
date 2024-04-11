import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { League } from '../../classes/league';
import { LeagueSerialiserService } from '../../services/league-serialiser.service';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionButtonComponent],
  selector: 'app-league-export',
  standalone: true,
  styleUrls: ['./league-export.component.css'],
  templateUrl: './league-export.component.html',
})
export class LeagueExportComponent {
  @Input({ required: true })
  public league!: League;

  public serialisedLeague!: string;

  public leagueSerialiserService: LeagueSerialiserService = inject(LeagueSerialiserService);

  public ngOnChanges(): void {
    this.serialisedLeague = this.leagueSerialiserService.serialise(this.league);
  }

  public onExport(): void {
    navigator.clipboard.writeText(this.serialisedLeague);
  }
}
