
import mongoose from "mongoose";

export async function connectToDB(){

    try{    
      const {connection} =  await mongoose.connect(process.env.MONGO_URI);

      if(connection){
        console.log(`Mongodb connected at ${connection.host}`)
      }
    }catch(error){
        console.log("Unable to connect to mongodb database",error.message)
    }
}