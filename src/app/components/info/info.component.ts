import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-info',
  standalone: true,
  styleUrls: ['./info.component.css'],
  templateUrl: './info.component.html'
})
export class InfoComponent {
  @Input({ required: true })
  public message!: string;
}
