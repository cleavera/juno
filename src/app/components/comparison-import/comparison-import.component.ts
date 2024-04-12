import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { League } from '../../classes/league';
import { LeagueSerialiserService } from '../../services/league-serialiser.service';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { InfoComponent } from '../info/info.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionButtonComponent, InfoComponent],
  selector: 'app-comparison-import',
  standalone: true,
  styleUrls: ['./comparison-import.component.css'],
  templateUrl: './comparison-import.component.html'
})
export class ComparisonImportComponent {
  @Output()
  public import: EventEmitter<League> = new EventEmitter<League>();

  private _leageueSerialiserService: LeagueSerialiserService = inject(LeagueSerialiserService);

  public async onImport(importElement: HTMLTextAreaElement): Promise<void> {
    const serialisedLeague: string | null = importElement.value;

    if (serialisedLeague === null) {
      return;
    }

    const league: League = this._leageueSerialiserService.deserialise(serialisedLeague);

    this.import.emit(league);
  }
}
