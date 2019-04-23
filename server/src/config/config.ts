import {Configuration} from 'tsunamy/core';

export let CONFIGURATION: Configuration = {
  hostname : '127.0.0.1',
  http: true,
  httpPort: 8088,
  https: false,
  httpsPort: 8443,
  pathAPI: 'api',
  projectDirectory: __dirname + '/..'
};
