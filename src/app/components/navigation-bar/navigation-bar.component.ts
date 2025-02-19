import { ChangeDetectionStrategy, Component, OutputEmitterRef, output } from '@angular/core';
import { States } from '../../constants/states.constant';
import { LogoComponent } from '../logo/logo.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent],
  selector: 'app-navigation-bar',
  standalone: true,
  styleUrl: './navigation-bar.component.css',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent {
  public navigate: OutputEmitterRef<States> = output<States>();

  public onRound(): void {
    this.navigate.emit(States.ROUND);
  }

  public onLeague(): void {
    this.navigate.emit(States.LEAGUE);
  }

  public onComparison(): void {
    this.navigate.emit(States.COMPARISON);
  }
}
