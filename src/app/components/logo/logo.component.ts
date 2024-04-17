import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-logo',
  standalone: true,
  styleUrl: './logo.component.css',
  templateUrl: './logo.component.html'
})
export class LogoComponent {
}
