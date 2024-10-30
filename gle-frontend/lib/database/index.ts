import mongoose from 'mongoose';

// moongoose connection to the database using the MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;

// caching the connection to the database
let cached = (global as any).mongoose || { conn: null, promise: null };

// function to connect to the database
export const connectToDatabase = async () => {
    if(cached.conn) {
        return cached.conn; // return the connection if it is already established
    }

    // throw an error if the MONGODB_URI is missing
    if(!MONGODB_URI) throw new Error('MongoDB URI is missing');

    // establish a connection to the database
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'experdb',
        bufferCommands: false,
    })

    // cache the connection
    cached.conn = await cached.promise;

    // return the connection
    return cached.conn;

}