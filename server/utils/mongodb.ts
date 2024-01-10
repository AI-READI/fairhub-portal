import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri: any = process.env.MONGODB_URI;

const options = {};

let client: any;
// eslint-disable-next-line import/no-mutable-exports
let mongodbClientPromise: any;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  let { _mongoClientPromise }: any = global;

  if (!_mongoClientPromise) {
    client = new MongoClient(uri, options);

    _mongoClientPromise = client.connect();
  }
  mongodbClientPromise = _mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);

  mongodbClientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongodbClientPromise;
