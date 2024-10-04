import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({path:".env.local"})
const generateToken = (user, res) => {
  const { email, username, _id } = user; 
  const token = jwt.sign({ email, username }, process.env.SECRET_KEY, { expiresIn: "10d" });

  res.cookie("jwt", token, {
    httpOnly: true,  
    secure: true,    
    sameSite: "None", 
  });

  return res.status(200).json({ message: "Login successful",
    username:username,
    email:email,
    id:_id
  });
};

export default generateToken;
