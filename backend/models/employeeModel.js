import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: Number,
        unique: true, 
        required: true
    },
    name: { type: String, required: true, },
    email: { type: String, required: true,unique:true},
    mobile: { type: String, required: true,unique:true },
    designation: { type: String,  },
    gender: { type: String,  },
    course: { type: [String], },
    photoUrl:{ type:String,required:true},
    createDate: { type: Date, default: Date.now },
    addedBy: { type: String, required: true } 
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee


