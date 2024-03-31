import { Component, Input } from '@angular/core';
import { Round } from '../../classes/round';

@Component({
  selector: 'app-round-progress',
  standalone: true,
  styleUrls: ['./round-progress.component.css'],
  templateUrl: './round-progress.component.html',
})
export class RoundProgressComponent {
  @Input({ required: true })
  public round!: Round;
}
