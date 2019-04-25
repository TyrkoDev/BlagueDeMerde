import { TyModule } from 'tsunamy/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@TyModule({
  declarations: [AppController],
  providers: [AppService]
})
export class AppModule { }
