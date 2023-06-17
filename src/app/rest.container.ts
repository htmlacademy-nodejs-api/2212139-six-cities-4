import { Container } from 'inversify';
import { ConfigInterface } from '../core/config/config.interface.js';
import ConfigService from '../core/config/config.service.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import PinoService from '../core/logger/pino.service.js';
import { AppComponent } from '../types/app-component.enum.js';
import RestApplication from './rest.js';
import { ExceptionFilterInterface } from '../core/exception-filters/exception-filter.interface.js';
import ValidationExceptionFilter from '../core/exception-filters/validation.exeption-filter.js';
import BaseExceptionFilter from '../core/exception-filters/base.exeption-filter.js';
import HttpErrorExceptionFilter from '../core/exception-filters/http-error.exeption-filter.js';

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
  restApplicationContainer
    .bind<ExceptionFilterInterface>(AppComponent.HttpErrorExeptionFilter)
    .to(HttpErrorExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilterInterface>(AppComponent.ValidationExeptionFilter)
    .to(ValidationExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilterInterface>(AppComponent.BaseExeptionFilter)
    .to(BaseExceptionFilter)
    .inSingletonScope();

  return restApplicationContainer;
}
