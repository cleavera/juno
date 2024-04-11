import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-combination-value',
  standalone: true,
  styleUrls: ['./combination-value.component.css'],
  templateUrl: './combination-value.component.html'
})
export class CombinationValueComponent {
  @Input({ required: true })
  @HostBinding('style.--maxRating')
  public maxRating!: number;

  @Input({ required: true })
  @HostBinding('style.--minRating')
  public minRating!: number;

  @Input({ required: true })
  @HostBinding('style.--rating')
  public rating!: number;

  @Input()
  @HostBinding('class.isMine')
  public isMine: boolean = false;
}
