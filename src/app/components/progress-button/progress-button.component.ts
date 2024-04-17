import { ChangeDetectionStrategy, Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-progress-button',
  standalone: true,
  styleUrl: './progress-button.component.css',
  templateUrl: './progress-button.component.html'
})
export class ProgressButtonComponent {
  public disabled: InputSignal<boolean> = input(false);
  public progress: OutputEmitterRef<void> = output<void>();

  public onDone(): void {
    this.progress.emit();
  }
}
