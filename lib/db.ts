import mongoose from 'mongoose';


const MONGOOSE_URI = process.env.MONGOOSE_URI!;

if (!MONGOOSE_URI) {
  throw new Error('MONGOOSE_URI environment variable is not set');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: "", promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10 
        };

         cached.promise = mongoose
    .connect(MONGOOSE_URI, opts)
    .then(() => mongoose.connection);
    }

    try{
        cached.conn = await cached.promise;
        return cached.conn;
    }catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
