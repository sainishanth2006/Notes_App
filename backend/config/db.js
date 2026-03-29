import mongoose from "mongoose"
export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.mongo_uri)
        console.log("Mongo DB succesfully connected")

    }catch(err){
        console.log("Error in connecting to DB. ",err)
    }

}