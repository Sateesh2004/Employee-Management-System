import Employee from '../models/employeeModel.js'; 
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

const addEmployee = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course, addedBy } = req.body;
 


        if(!name){
            return res.status(400).json({message:"Name is required!"})
        }
        if(!email){
            return res.status(400).json({message:"Email is required!"})
        }
        if(!mobile){
            return res.status(400).json({message:"Number is required!"})
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo!' });
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format!' });
        }


        const mobileRegex = /^[0-9]+$/; 
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: 'Invalid mobile number!' });
        }


        const allowedImageTypes = ['image/jpeg', 'image/png'];
        if (!allowedImageTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ message: 'Only JPG and PNG files are allowed!' });
        }

        const existingEmployee = await Employee.findOne({ $or: [{ email }, { mobile }] });
        if (existingEmployee) {
            if (existingEmployee.email === email) {
                return res.status(400).json({ message: 'Email already exists!' });
            }
            if (existingEmployee.mobile === mobile) {
                return res.status(400).json({ message: 'Mobile number already exists!' });
            }
        }
       

        
        const photoUrl = `/uploads/${req.file.filename}`;

        
        const latestEmployee = await Employee.findOne().sort({ employeeId: -1 });

        
        const newEmployeeId = latestEmployee ? latestEmployee.employeeId + 1 : 1001; 

        const newEmployee = new Employee({
            employeeId: newEmployeeId, 
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            addedBy,
            photoUrl, 
        });

        const savedEmployee = await newEmployee.save();

        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error('Error adding employee:', error); 
        res.status(500).json({ message: error.message });
    }
};

export { addEmployee, upload };
