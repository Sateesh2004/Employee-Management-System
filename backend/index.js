import express from "express"
import dotenv from "dotenv"
import multer from "multer"
import cookieParser from "cookie-parser"
import connect from "./config/connectdb.js"
import adminRoutes from "./routes/adminRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import cors from "cors"
import Employee from "./models/employeeModel.js"
import jwt from "jsonwebtoken"
import Photo from "./models/photoUpload.js"
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config({path:".env.local"})

const app = express()
app.use(cookieParser())

const allowedOrigins = ['https://dealsdray-eosin.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust as necessary
    credentials: true // Include this if your requests require credentials (cookies, authorization headers, etc.)
}));              



app.use(express.json());


const port = process.env.PORT
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.get('/api/employees', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const skip = (page - 1) * limit;
  
      const searchQuery = req.query.search || '';
  
      const query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } }, 
          { _id: searchQuery.length === 24 ? searchQuery : null } 
        ]
      };
  
     
      const employees = await Employee.find(query)
        .skip(skip)
        .limit(limit);
  
      const totalEmployees = await Employee.countDocuments(query);
  
      res.json({
        employees,
        totalEmployees,
        totalPages: Math.ceil(totalEmployees / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get("/validate/:username", async (req, res) => {
    try {
      const { username } = req.params;
      
      
  
      
      const token = req.cookies.jwt; 
  
      if (!token) {
        return res.status(401).json({ message: "No token provided" }); 
      }
  
      
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      console.log("Decoded token:", decoded);
      if(username!==decoded.username){
        return res.status(401).json({message:"Unauthorized User"})
      }
      return res.status(200).json({ message: "Token is valid", user: decoded }); 
    } catch (error) {
      console.error("Token validation error:", error);
      return res.status(401).json({ message: "Invalid token" }); 
    }
  });
  app.delete("/delete/employees/:employeeId", async (req, res) => {
    try {
      const { employeeId } = req.params; 
      console.log("Deleting Employee with ID:", employeeId);
      
      
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
      console.log(deletedEmployee) 
      
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error while deleting employee:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const upload = multer({ storage });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.put("/update/employees/:employeeId", upload.single('photo'), async (req, res) => {
    const { employeeId } = req.params; 
    const { name, email, mobile} = req.body;
    if(!name){
      return res.status(400).json({message:"Name is required!"})
  }
    if(!email){
      return res.status(400).json({message:"Email is required!"})
  }
  if(!mobile){
      return res.status(400).json({message:"Number is required!"})
  }
  


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format!' });
  }


  const mobileRegex = /^[0-9]+$/; 
  if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number!' });
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
    console.log(req.body)
    const updatedData = req.body; 
    try {
        
        if (req.file) {
          const allowedImageTypes = ['image/jpeg', 'image/png'];
          if (!allowedImageTypes.includes(req.file.mimetype)) {
         return res.status(400).json({ message: 'Only JPG and PNG files are allowed!' });
  }
            updatedData.photoUrl = `/uploads/${req.file.filename}`; 
        }
        console.log(req.file)

        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.send(updatedEmployee);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: 'Error updating employee', error });
    }
});



  

 

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  app.post('/logout', (req, res) => {
    res.clearCookie('jwt'); 
    return res.status(200).json({ message: "Logged out successfully" });
  });






  


  







  
  
app.use('/auth', adminRoutes);
app.use('/employee', employeeRoutes);
app.listen(port,()=>{
    connect()
    console.log(`http://localhost:${port}`)}
)