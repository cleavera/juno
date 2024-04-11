import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Combination } from '../../classes/combination';
import { League } from '../../classes/league';
import { CombineFactory } from '../../services/combine.factory';
import { ComparisonImportComponent } from '../comparison-import/comparison-import.component';

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

  public combinations: Array<Combination> | null = null;

  private _combineFactory: CombineFactory = inject(CombineFactory);

  public onImport(league: League): void {
    this.combinations = this._combineFactory.create(this.league, league);
    this.combinations.sort((a: Combination, b: Combination) => {
      if (a.combined < b.combined) {
        return 1;
      }

      if (a.combined > b.combined) {
        return -1;
      }

      if (a.min < b.min) {
        return 1;
      }

      if (a.min > b.min) {
        return -1;
      }

      if (a.total < b.total) {
        return 1;
      }

      if (a.total > b.total) {
        return -1;
      }

      return 0;
    });
  }
}
