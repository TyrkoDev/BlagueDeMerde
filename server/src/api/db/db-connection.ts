import * as mongoose from 'mongoose';

export class DBConnection {
    private static dbConnection: DBConnection = new DBConnection();

    private constructor() {
        mongoose.connect('mongodb://localhost/blaguedemerde', {useNewUrlParser: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    public static get connection(): any {
        return this.dbConnection;
    }

    public get mongoose(): any {
        return mongoose;
    }
}