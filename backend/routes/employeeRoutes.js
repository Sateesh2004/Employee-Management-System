import express from 'express';
import { addEmployee, upload } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/add', upload.single('photo'), addEmployee);

export default router;
