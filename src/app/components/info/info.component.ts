import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-info',
  standalone: true,
  styleUrls: ['./info.component.css'],
  templateUrl: './info.component.html'
})
export class InfoComponent {
  public message: InputSignal<string> = input.required<string>();
}
