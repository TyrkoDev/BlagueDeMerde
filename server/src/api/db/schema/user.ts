import {DBConnection} from '../db-connection';


export class User {
    private userSchema = new DBConnection.connection.mongoose.Schema({
        // name: String,
        // firstName: String,
        // password: String,
        // email: String,
        // pseudo: String,
        // idEquipe: Number
    });
}