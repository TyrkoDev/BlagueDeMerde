import {RequestMapping, Controller, Console} from 'tsunamy/core';
import { MongoService } from './mongo.service';
import mongoose from 'mongoose';

@Controller()
export class MongoController {

    constructor(private mongoservice: MongoService) {
        mongoose.connect('mongodb://localhost:27017/bdm', {useNewUrlParser: true}).then((value: any) => {
            if (value) {
                Console.Info('Connected to db : ' + value.connections[0].name);
            } else {
                Console.Err('Connection error');
            }
        }).catch((err: any) => Console.Err(err));
    }

    @RequestMapping({ path: '/mongo/controller', method: 'GET'})
    hi(): any {
        return {hello: this.mongoservice.hi()};
    }

    @RequestMapping({ path: '/mongo/connected', method: 'GET'})
    connected(): any {
        return {connected: mongoose.connection.readyState === 1};
    }
}
