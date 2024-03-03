import { Component, Input } from '@angular/core';
import { League } from '../../classes/league';

@Component({
  selector: 'app-league',
  standalone: true,
  styleUrls: ['./league.component.css'],
  templateUrl: './league.component.html'
})
export class LeagueComponent {
  @Input({ required: true })
  public league!: League;
}
