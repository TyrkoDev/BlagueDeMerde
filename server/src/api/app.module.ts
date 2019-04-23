import { TsModule } from 'tsunamy/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@TsModule({
  declarations: [AppController],
  providers: [AppService]
})
export class AppModule { }
