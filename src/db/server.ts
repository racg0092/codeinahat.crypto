import { MongoClient } from 'mongodb';

export class DatabaseServer {
    constructor(private connectionString: string) {}

    async connect() {
        const result = await new MongoClient(this.connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).connect();
        return result;
    }
}