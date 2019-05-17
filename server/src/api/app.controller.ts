import {Controller, RequestMapping} from 'tsunamy/core';

@Controller()
export class AppController {

  @RequestMapping({ path: '/err', method: 'GET'})
  error() {
    return {error: 518};
  }
}
