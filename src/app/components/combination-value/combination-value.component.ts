import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--maxRating]': 'maxRating()',
    '[style.--minRating]': 'minRating()',
    '[style.--rating]': 'rating()',
    '[class.isMine]': 'isMine()'
  },
  selector: 'app-combination-value',
  standalone: true,
  styleUrl: './combination-value.component.css',
  templateUrl: './combination-value.component.html'
})
export class CombinationValueComponent {
  public maxRating: InputSignal<number> = input.required<number>();
  public minRating: InputSignal<number> = input.required<number>();
  public rating: InputSignal<number> = input.required<number>();
  public isMine: InputSignal<boolean> = input<boolean>(false);
}
