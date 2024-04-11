import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-action-button',
  standalone: true,
  styleUrls: ['./action-button.component.css'],
  templateUrl: './action-button.component.html'
})
export class ActionButtonComponent {
  @Input({ required: true })
  public text!: string;

  @Output()
  public activate: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.activate.emit();
  }
}
