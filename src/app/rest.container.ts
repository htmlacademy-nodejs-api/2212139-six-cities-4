import { Container } from 'inversify';
import { ConfigInterface } from '../core/config/config.interface';
import ConfigService from '../core/config/config.service';
import { RestSchema } from '../core/config/rest.schema';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface';
import MongoClientService from '../core/database-client/mongo-client.service';
import { LoggerInterface } from '../core/logger/logger.interface';
import PinoService from '../core/logger/pino.service';
import { AppComponent } from '../types/app-component.enum';
import RestApplication from './rest.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();
  restApplicationContainer
    .bind<RestApplication>(AppComponent.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<LoggerInterface>(AppComponent.LoggerInterface)
    .to(PinoService)
    .inSingletonScope();
  restApplicationContainer
    .bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface)
    .to(ConfigService)
    .inSingletonScope();
  restApplicationContainer
    .bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface)
    .to(MongoClientService)
    .inSingletonScope();

  return restApplicationContainer;
}
