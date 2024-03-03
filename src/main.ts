import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';
import { LeagueSerialiserService } from './app/services/league-serialiser.service';
import { LeagueFactory } from './app/services/league.factory';
import { PersistenceService } from './app/services/persistence.service';
import { RoundFactory } from './app/services/round.factory';
import { RoundSerialiserService } from './app/services/round-serialiser.service';

bootstrapApplication(AppComponent, {
  providers: [
    LeagueFactory,
    LeagueSerialiserService,
    PersistenceService,
    RoundFactory,
    RoundSerialiserService
  ]
})
  .catch((err) => console.error(err));
