import 'dotenv/config';
import mongoose from "mongoose";


export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING)
        console.log("connected to database successfully")
    } catch (error) {
        console.log("error in connecting to database", error)
    }
}
