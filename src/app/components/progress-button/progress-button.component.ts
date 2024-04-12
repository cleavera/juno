import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-progress-button',
  standalone: true,
  styleUrls: ['./progress-button.component.css'],
  templateUrl: './progress-button.component.html'
})
export class ProgressButton {
  @Output()
  public progress: EventEmitter<void> = new EventEmitter<void>();

  public onDone(): void {
    this.progress.emit();
  }
}
