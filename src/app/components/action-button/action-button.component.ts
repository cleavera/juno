import { ChangeDetectionStrategy, Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-action-button',
  standalone: true,
  styleUrl: './action-button.component.css',
  templateUrl: './action-button.component.html'
})
export class ActionButtonComponent {
  public text: InputSignal<string> = input.required<string>();
  public activate: OutputEmitterRef<void> = output<void>();

  public onClick(): void {
    this.activate.emit();
  }
}
