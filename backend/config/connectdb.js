import mongoose from "mongoose"
const connect = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("connected")
    }
    catch(e){
        console.log("MongoDB connection error:",e)
    }
    
}

export default connect