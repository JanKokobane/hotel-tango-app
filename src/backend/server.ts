import dotenv from 'dotenv';
dotenv.config(); 
 import loginRoutes from './routes/loginRoutes';


import express from 'express';
import cors from 'cors';
import './config/db';
import authRoutes from './routes/registrationRoute';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});