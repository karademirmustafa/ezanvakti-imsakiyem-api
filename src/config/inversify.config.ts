import { Container } from 'inversify';
import { 
  CountryRepository,
  StateRepository,
  DistrictRepository,
  PrayerTimeRepository,
  LogRepository
} from '../repositories';

import { 
  LocationService,
  PrayerService,
  LogService
} from '../services';

import { 
  LocationController,
  PrayerTimeController 
} from '../controllers';
import { LogWorker } from '../workers/log.worker';


export const container = new Container();

// Repositories
container.bind(CountryRepository).toSelf();
container.bind(StateRepository).toSelf();
container.bind(DistrictRepository).toSelf();
container.bind(PrayerTimeRepository).toSelf();
container.bind(LogRepository).toSelf();

// Services
container.bind(LocationService).toSelf();
container.bind(PrayerService).toSelf();
container.bind(LogService).toSelf();

// Controllers
container.bind(LocationController).toSelf();
container.bind(PrayerTimeController).toSelf();


// Workers
container.bind(LogWorker).toSelf();