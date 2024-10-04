import mongoose from "mongoose"

const photoSchema = new mongoose.Schema({
    
        photoUrl: String,
    
      
});

const Photo = mongoose.model('Photo', photoSchema);
export default Photo


