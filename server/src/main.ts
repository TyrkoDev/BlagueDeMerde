import { Server } from 'tsunamy/core';
import { AppModule } from './api/app.module';
import { CONFIGURATION } from './config/config';

new Server().bootstrapModule(AppModule, CONFIGURATION);
