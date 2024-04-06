import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';
import { HeadToHeadSerialiserService } from './app/services/head-to-head-serialiser.service';
import { LeagueSerialiserService } from './app/services/league-serialiser.service';
import { LeagueFactory } from './app/services/league.factory';
import { PersistenceService } from './app/services/persistence.service';
import { RoundSerialiserService } from './app/services/round-serialiser.service';
import { RoundFactory } from './app/services/round.factory';
import { CombineFactory } from './app/services/combine.factory';

bootstrapApplication(AppComponent, {
  providers: [
    CombineFactory,
    HeadToHeadSerialiserService,
    LeagueFactory,
    LeagueSerialiserService,
    PersistenceService,
    RoundFactory,
    RoundSerialiserService
  ]
})
  .catch((err) => console.error(err));
