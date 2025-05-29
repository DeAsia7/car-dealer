import express from 'express';
import carRoutes from '../routes/cars.js';
import clientRoutes from '../routes/clients.js';
import salesRoutes from '../routes/sales.js';
import authRoutes from '../routes/auth.js';
import {logger} from '../middlewares/logger.js';
import {verifyToken } from '../middlewares/token.js';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());
app.use(logger);

app.use(authRoutes);

app.use('/cars', verifyToken, carRoutes);
app.use('/' , verifyToken, clientRoutes);
app.use('/', verifyToken, salesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})







/*

import { z } from 'zod';

//building schemsd for each body 

//login schema 
export const loginSchema = z.object({
    username: z.string().min(1), 
    password: z.string().min(6)
});


//client schema
export const clientSchema = z.object({
   first_name: z.string().min(2),
    last_name: z.string().min(2),
    age: z.number().int(18),
    is_premium: z.boolean(),
});

//sales schema 
export const salesSchema = z.object({
    client_id: z.number().int(),
    car_id: z.number().int(), 
});
 
*/