import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-action-button',
  standalone: true,
  styleUrl: './action-button.component.css',
  templateUrl: './action-button.component.html'
})
export class ActionButtonComponent {
  public text: InputSignal<string> = input.required<string>();

  @Output()
  public activate: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.activate.emit();
  }
}
