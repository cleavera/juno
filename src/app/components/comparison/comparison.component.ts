import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Combination } from '../../classes/combination';
import { League } from '../../classes/league';
import { ComparisonFactory } from '../../services/comparison.factory';
import { ComparisonImportComponent } from '../comparison-import/comparison-import.component';
import { Comparison } from '../../classes/comparison';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComparisonImportComponent, NgIf],
  selector: 'app-comparison',
  standalone: true,
  styleUrls: ['./comparison.component.css'],
  templateUrl: './comparison.component.html'
})
export class ComparisonComponent {
  @Input({ required: true })
  public league!: League;

  public comparison: Comparison | null = null;

  private _comparisonFactory: ComparisonFactory = inject(ComparisonFactory);

  public onImport(league: League): void {
    this.comparison = this._comparisonFactory.create(this.league, league);
  }
}
