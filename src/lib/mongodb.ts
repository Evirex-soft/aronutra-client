import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
    if (!(global as any)._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
}

export default clientPromise;
