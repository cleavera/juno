import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterComponent } from '../router/router.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterComponent],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
