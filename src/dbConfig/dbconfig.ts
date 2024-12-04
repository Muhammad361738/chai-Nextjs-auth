import { log } from "console";
import mongoose from "mongoose";
 
export async function Connection() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB connected')
        })
        connection.on('error',(error)=>{
            console.log("MongoDB Connection Error make sure Db is up and running" + error)
            process.exit()
        })
    } catch (error) {
        console.log('Something Went Wrong in connecting in DB ')
    }
}
