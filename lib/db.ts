
import mongoose from 'mongoose';

const MONGOOSE_URI = 'mongodb+srv://roy388925:JE1Em1OgYF9RFmQ2@instagram-clone.jo3ml6n.mongodb.net/?retryWrites=true&w=majority';

if (!MONGOOSE_URI) {
    throw new Error('MongoDB connection string is not set');
}



interface MongooseCache {
    conn: typeof mongoose.connection | null;
    promise: Promise<typeof mongoose.connection> | null;
}

let cached: MongooseCache = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}


export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        cached.promise = mongoose.connect(MONGOOSE_URI, opts).then(() => mongoose.connection);
    }
    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
}
