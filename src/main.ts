import RestApplication from './app/rest.js';
import ConfigService from './core/config/config.service.js';
import PinoService from './core/logger/pino.service.js';

async function bootstrap() {
  const logger = new PinoService();
  const config = new ConfigService(logger);

  const application = new RestApplication(logger, config);
  await application.init();
}

bootstrap();
