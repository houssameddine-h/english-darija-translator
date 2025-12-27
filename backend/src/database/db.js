import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';

const dbName = 'darija-translator';

const client = new MongoClient(uri);

const db = client.db(dbName);

export default db;
