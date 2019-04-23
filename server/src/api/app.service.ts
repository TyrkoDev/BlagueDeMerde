import { Controller, Injectable } from 'tsunamy/core';

@Injectable()
export class AppService {

  constructor() {}

  hi(): string {
    return 'Tsunamy';
  }
}
