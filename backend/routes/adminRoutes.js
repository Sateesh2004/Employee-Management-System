import express from "express"

import {registerAdmin,signin}  from "../controllers/adminController.js"
const router = express.Router();

router.post('/register', registerAdmin);
router.post("/signin",signin)
export default router
