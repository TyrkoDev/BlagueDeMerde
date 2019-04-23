import * as mongoose from 'mongoose';

export class DBConnection {
    private static dbConnection: DBConnection = new DBConnection();

    private constructor() {
        mongoose.connect('mongodb://localhost/blaguedemerde', {useNewUrlParser: true});
    }

    public static get Connection() {
        return this.dbConnection;
    }
}