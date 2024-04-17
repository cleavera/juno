import { ChangeDetectionStrategy, Component, InputSignal, Signal, WritableSignal, computed, inject, input, signal } from '@angular/core';
import { Comparison } from '../../classes/comparison';
import { League } from '../../classes/league';
import { ComparisonFactory } from '../../services/comparison.factory';
import { CombinationValueComponent } from '../combination-value/combination-value.component';
import { ComparisonImportComponent } from '../comparison-import/comparison-import.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--comparison-max]': 'max()'
  },
  imports: [CombinationValueComponent, ComparisonImportComponent],
  selector: 'app-comparison',
  standalone: true,
  styleUrl: './comparison.component.css',
  templateUrl: './comparison.component.html'
})
export class ComparisonComponent {
  public league: InputSignal<League> = input.required<League>();

  public comparison: WritableSignal<Comparison | null>;
  public max: Signal<number | null>;

  private _comparisonFactory: ComparisonFactory = inject(ComparisonFactory);

  constructor() {
    this.comparison = signal(null);
    this.max = computed(() => this.comparison()?.max ?? null);
  }

  public onImport(league: League): void {
    this.comparison.set(this._comparisonFactory.create(this.league(), league));
  }
}
