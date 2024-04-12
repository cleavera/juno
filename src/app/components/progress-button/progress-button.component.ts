import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-progress-button',
  standalone: true,
  styleUrls: ['./progress-button.component.css'],
  templateUrl: './progress-button.component.html'
})
export class ProgressButtonComponent {
  public disabled: InputSignal<boolean> = input(false);

  @Output()
  public progress: EventEmitter<void> = new EventEmitter<void>();

  public onDone(): void {
    this.progress.emit();
  }
}
