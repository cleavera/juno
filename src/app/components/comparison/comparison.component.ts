import { ChangeDetectionStrategy, Component, HostBinding, InputSignal, inject, input } from '@angular/core';
import { Comparison } from '../../classes/comparison';
import { League } from '../../classes/league';
import { ComparisonFactory } from '../../services/comparison.factory';
import { CombinationValueComponent } from '../combination-value/combination-value.component';
import { ComparisonImportComponent } from '../comparison-import/comparison-import.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CombinationValueComponent, ComparisonImportComponent],
  selector: 'app-comparison',
  standalone: true,
  styleUrls: ['./comparison.component.css'],
  templateUrl: './comparison.component.html'
})
export class ComparisonComponent {
  public league: InputSignal<League> = input.required<League>();

  public comparison: Comparison | null = null;

  @HostBinding('style.--comparison-max')
  public max: number | null = null;

  private _comparisonFactory: ComparisonFactory = inject(ComparisonFactory);

  public onImport(league: League): void {
    this.comparison = this._comparisonFactory.create(this.league(), league);
    this.max = this.comparison.max;
  }
}
