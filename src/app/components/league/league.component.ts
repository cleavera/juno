import { ChangeDetectionStrategy, Component, InputSignal, inject, input } from '@angular/core';
import { League } from '../../classes/league';
import { LeagueExportComponent } from '../league-export/league-export.component';
import { PersistenceService } from '../../services/persistence.service';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionButtonComponent, LeagueExportComponent],
  selector: 'app-league',
  standalone: true,
  styleUrls: ['./league.component.css'],
  templateUrl: './league.component.html'
})
export class LeagueComponent {
  public league: InputSignal<League> = input.required<League>();

  private readonly _persistenceService: PersistenceService = inject(PersistenceService);

  public onClear(): void {
    if (confirm('Are you sure, you will lose all your data?')) {
      this._persistenceService.clear();
      location.reload();
    }
  }
}
