import { RequestMapping, PathParam, Controller, QueryParam  } from 'tsunamy/core';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor( private appservice: AppService) { }

  @RequestMapping({ path: '/hello/{var1}', method: 'GET'})
  hello(@PathParam('var1') var1: number, @QueryParam('var2') var2: any) {
    return var1 + var2 + ' ' + this.appservice.hi();
  }

  @RequestMapping({ path: '/hi', method: 'GET'})
  hello2() {
    return {test: 'I am ' + this.appservice.hi()};
  }

  @RequestMapping({ path: '/err', method: 'GET'})
  error() {
    return {error: 4000, message: 'error'};
  }
}
